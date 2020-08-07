### Some demos for [TensorFlow User Group Niigata#3](https://tfug-niigata.connpass.com/event/183971/)

[TensorFlow User Group Niigata#3](https://tfug-niigata.connpass.com/event/183971/)のために作成したデモです。

発表スライドは[こちら](https://docs.google.com/presentation/d/e/2PACX-1vRIS_NWDaUrFbiuheMkiVHLYeHsArRyyAkEIHlKYKXW8DSfHyitJ8pcXbM6Y_GqhgxfJH_ZuOFCb693/pub?start=false&loop=false&delayms=3000)です。

### ブックマークレット

<a href="javascript:navigator.mediaDevices.getDisplayMedia({video:!0}).then(e=>{navigator.mediaDevices._getUserMedia||(navigator.mediaDevices._getUserMedia=navigator.mediaDevices.getUserMedia),navigator.mediaDevices.getUserMedia=function(i){return new Promise((a,t)=>{navigator.mediaDevices._getUserMedia(i).then(t=>{if(i.video&&e&&e.active){const i=t.getVideoTracks();i.length&&(t.removeTrack(i[0]),t.addTrack(e.getVideoTracks()[0]))}a(t)}).catch(e=>{t(e)})})}});">screen > webcam</a>

Chrome タブやウィンドウ、画面を Google Meet で Webカメラとして認識させるブックマークレットです。

- 上記のリンクをブックマークバーに登録して使います。  
- 本ブックマークレットを実行した後にカメラを一度オフ > オン にすることで有効になります。
- もとに戻すには、ブックマークレットの選択画面で「キャンセル」を押します

### デモへのリンク

1. [画風変換](examples/style.html)
   - Webカメラを絵画調に変換します。
2. [背景透過](examples/chromakey.html)
   - 任意の画面を背景に、人間以外を透過させます
3. [手認識](examples/hand.hrml)
   - 手を認識すると枠が赤くなります
4. [ポインター](examples/hand_screen.html)
   - 手の位置を認識してポインターのような動きをします

