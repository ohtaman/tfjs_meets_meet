// Reference: https://techblog.securesky-tech.com/entry/2020/04/30/
// 任意のDisplayMedia (画面、ウィンドウ、Chromeタブ) を共有 
navigator.mediaDevices.getDisplayMedia({video: true}).then((screenStream) => {
    // オリジナルの getUserMedia を退避
    if (!navigator.mediaDevices._getUserMedia) {
        navigator.mediaDevices._getUserMedia = navigator.mediaDevices.getUserMedia
    }
    // videoTrackを置換する処理を追加
    navigator.mediaDevices.getUserMedia = function (constraints){
        return new Promise((resolve, reject) => {
            navigator.mediaDevices._getUserMedia(constraints).then((stream) => {
                if (constraints.video && screenStream && screenStream.active) {
                    const tracks = stream.getVideoTracks()
                    if (tracks.length) {
                        stream.removeTrack(tracks[0])
                        stream.addTrack(screenStream.getVideoTracks()[0])
                    }
                }
                resolve(stream)
            }).catch((err) => {
                reject(err)
            })
        })
    }
})