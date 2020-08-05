let canvas
let screen
let capture
const model = ml5.uNet('face')

function createDisplayCapture (constraints, callback) {
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

function setup () {
    canvas = createCanvas(windowWidth, windowHeight)
    screen = createDisplayCapture({video: true, audio: true})
    capture = createCapture(VIDEO, () => {
        bufferImage = createImage(capture.width, capture.height)
        maskedImage = createImage(capture.width, capture.height)
        model.segment(capture, gotResult)
    })

    capture.hide()
    screen.hide()
}

function gotResult (error, result) {
    if (error) {
        console.log(error)
    } else {
        mask = result.backgroundMask
        if (canvas.height / canvas.width > screen.height / screen.width) {
            width = canvas.width
            height = screen.height*canvas.width/screen.width
        } else {
            width = screen.width*canvas.height/screen.height
            height = canvas.height
        }
        mask.filter(BLUR, 2)
        background(0, 0, 0)
        image(screen, int((canvas.width - width)/2), int((canvas.height - height)/2), width, height)
        capture.mask(mask)
        image(
            capture,
            0, int(canvas.height*2/3),
            int((capture.width/capture.height)*(canvas.height*1/3)), int(canvas.height*1/3)
        )
        // image(
        //     capture.mask(mask)
        //     0, int(canvas.height*2/3),
        //     int((capture.width/capture.height)*(canvas.height*1/3)), int(canvas.height*1/3)
        // )
    }

    model.segment(capture, gotResult)
    return
}

function windowResized () {
    resizeCanvas(windowWidth, windowHeight)
}