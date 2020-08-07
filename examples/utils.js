
export class utils {
    createDisplayCapture (constraints, callback) {
        const elem = document.createElement('video')
        elem.setAttribute('playsinline', '')
        document.body.appendChild(elem)

        navigator.mediaDevices.getDisplayMedia(constraints).then(
            stream => {
                elem.srcObject = stream
            }
        )

        const video = new p5.MediaElement(elem, p5.instance)
        p5.instance._elements.push(video)
        video.loadedmetadata = false

        elem.addEventListener('loadedmetadata', () => {
            elem.play()
            video.width = elem.width = elem.videoWidth
            video.height = elem.height = elem.videoHeight
            video.loadedmetadata = true

            if (callback) callback(elem.srcObject)
        })

        return video
    }
}