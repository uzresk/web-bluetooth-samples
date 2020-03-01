WebBluetoothのサンプルアプリケーションです。

動かし方

- npm install or yarn install
- npm start or yarn start

試す場合はBLEを試すようのアプリケーションを利用します。

- https://apps.apple.com/us/app/lightblue-explorer-bluetooth-low-energy/id557428110
- VirtualDevices → Health Thermometerを選択し、「Temperature Measurement」で値を入力してください。
- 36を入力する場合にはHex→24

Azure App Serviceにデプロイする場合

- WebAppを作成する
- .envでポート番号を変更
- VSCode → Ctrl+Shift+p → [Azure App Service: Deploy to Web App]

注意点

- react-scriptsは3.3.0だとhttpsで動かないのであえて3.2.0にしてあります。

参考

- https://webbluetoothcg.github.io/web-bluetooth/
- https://www.bluetooth.com/specifications/gatt/services/
- https://www.bluetooth.com/specifications/gatt/characteristics/
