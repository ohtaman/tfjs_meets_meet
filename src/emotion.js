import * from 'utils';

let canvas
let screen
let capture
let mask
let bufferImage
let maskedImage
const model = ml5.faceApi({
        withLandmarks: false,
        withDescriptors: false
    },
    detectContinuous
)

function detectContinuous () {
    faceapi.detect(capture).then(results => {
        for (face in results) {
            capture.
        }
        detectContinuous ()
    })
}

// function createDisplayCapture (constraints, callback) {
//     const elem = document.createElement('video')
//     elem.setAttribute('playsinline', '')
//     document.body.appendChild(elem)

//     navigator.mediaDevices.getDisplayMedia(constraints).then(
//         stream => {
//             elem.srcObject = stream
//         }
//     )

//     const video = new p5.MediaElement(elem, p5.instance)
//     p5.instance._elements.push(video)
//     video.loadedmetadata = false

//     elem.addEventListener('loadedmetadata', () => {
//         elem.play()
//         video.width = elem.width = elem.videoWidth
//         video.height = elem.height = elem.videoHeight
//         video.loadedmetadata = true

//         if (callback) callback(elem.srcObject)
//     })

//     return video
// }

function setup () {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO, videoReady)

    capture.hide()
}

function videoReady () {
    model.segment(capture, gotResult)
}

function gotResult (error, result) {
    if (error) {
        console.log(error)
    } else {
        mask = result.backgroundMask
        maskedImage.copy(bufferImage, 0, 0, bufferImage.width, bufferImage.height, 0, 0, maskedImage.width, maskedImage.height)
        maskedImage.mask(mask)
    }

    bufferImage.copy(capture, 0, 0, capture.width, capture.height, 0, 0, bufferImage.width, bufferImage.height)
    model.segment(capture, gotResult)
    return
}

function draw () {
    if (canvas.height / canvas.width > capture.height / capture.width) {
        width = canvas.width
        height = capture.height*canvas.width/capture.width
    } else {
        width = capture.width*canvas.height/capture.height
        height = canvas.height
    }

    background(0, 0, 0)
    image(capture, int((canvas.width - width)/2), int((canvas.heigh - height)/2), width, height)
}

function windowResized () {
    resizeCanvas(windowWidth, windowHeight)
}