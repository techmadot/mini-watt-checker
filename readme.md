このリポジトリは、SwitchBot スマートプラグミニによる消費電力モニタリングを可視化するものです。
Raspberry Pi Pico W を使用して、SwitchBot スマートプラグミニに接続します。
また、Pico W 自身が WebServer となりアプリケーションを提供します。

## 参考

下記のWebページで紹介されていたものを参考に作成しました。
コードベースもこちらのものを使用しています。

https://www.donskytech.com/using-websocket-in-micropython-a-practical-example/  
https://github.com/donskytech/micropython-raspberry-pi-pico/tree/main/websocket_using_microdot


## セットアップについて

boot.py に SSID/Passwordの指定をしてください。
main.py に接続対象のスマートプラグミニのアドレスを記載してください。

MicroPython を使用しているので、Pico Wのセットアップをしてください。
Wi-Fi および Bluetooth が使用可能なファームウェアが必要です。

utemplate のモジュールが必要なので、Thonny のパッケージ管理のメニューから、utemplate を追加してください。
警告が出ますが、ひとまずは動作するようです

## 注意

本ソフトウェアは自由に使用可能ですが、何の保証もありません。
試される場合には、自己責任でご利用ください。
