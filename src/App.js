import React, {useState} from 'react';

const App = () => {
    const [temperature, setTemperature] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const getTemperature = () => {
        setLoading(true);
        setErrorMessage(null);
        navigator.bluetooth.requestDevice({
            // acceptAllDevices: true,
            filters: [{
                services: ['health_thermometer']
            }]
        }).then(device => {
            return device.gatt.connect();
        }).then(server => {
            return server.getPrimaryService('health_thermometer')
        }).then(service => {
            return service.getCharacteristic('temperature_measurement');
        }).then(characteristic => {
            return characteristic.readValue()
        }).then(value => {
            // valueがDataView型で返ってくる
            setTemperature(handleDataView(value));
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setErrorMessage(err);
        });

    };

    const handleDataView = (dataView) => {
        switch (dataView.byteLength) {
            case 0:
                return 0;
            case 1:
                return dataView.getUint8(0)
            case 2:
                return dataView.getUint16(0)
            case 4:
                return dataView.getUint32(0)
            case 8: {
                const top = dataView.getUint32(0) * Math.pow(2, 32)
                const bottom = dataView.getUint32(4)
                return top + bottom
            }
            default:
                return 0
        }
    };
    return (
        <>
            <div>
                <button onClick={getTemperature}>connect device</button>
            </div>
            <div>
                {loading && !errorMessage ? (
                    <span>loading...</span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    <span>Temperature: {temperature}</span>
                )}
            </div>
        </>
    );
};

export default App;
