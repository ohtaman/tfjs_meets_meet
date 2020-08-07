let canvas
let screen
let webcam
let hands = []
let pointers = []

function setup () {
    canvas = createCanvas(windowWidth, windowHeight)
    screen = createDisplayCapture({video: {resizeMode: "crop-and-scale"}})
    webcam = createCapture(VIDEO)
    screen.hide()
    webcam.hide()

    handpose.load().then((res) => {
        model = res

        let detectHands = () => {
            if (webcam.loadedmetadata) {
                model.estimateHands(webcam.elt).then((res) => {
                    console.log(res)
                    hands = res
                    requestAnimationFrame(detectHands)
                })
            } else {
                requestAnimationFrame(detectHands)
            }
        }
        detectHands()
    })
}

function drawPointer(pointer) {
    noStroke()
    pointers.push(pointer)
    if (pointer.length > 20) {
        pointer.shift()
    }

    for (i = 0; i < pointers.length; ++i) {
        const x = canvas.width*pointers[i][0]
        const y = canvas.height*pointers[i][1]
        const size = abs(pointers[i][2])

        fill(255 - (pointers.length - i)*10, 0, 0)
        ellipse(x, y, size, size)
    }
}

function draw () {
    if (canvas.height / canvas.width > screen.height / screen.width) {
        width = canvas.width
        height = screen.height*canvas.width/screen.width
    } else {
        width = screen.width*canvas.height/screen.height
        height = canvas.height
    }

    background(0, 0, 0)
    image(screen, int((canvas.width - width)/2), int((canvas.heigh - height)/2), width, height)
    image(
        webcam,
        0, int(canvas.height*2/3),
        int(webcam.width*(canvas.height*1/3)/webcam.height), int(canvas.height*1/3)
    )

    if (hands.length > 0) {
        pointer = hands[0].annotations.indexFinger[3]
        pointer[0] /= webcam.width
        pointer[1] /= webcam.height
        drawPointer(pointer)
    }
}

function windowResized () {
    resizeCanvas(windowWidth, windowHeight)
}

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

    const adjustVideoSize = () => {
        video.width = elem.width = elem.videoWidth
        video.height = elem.height = elem.videoHeight
        video.loadedmetadata = true
        requestAnimationFrame(adjustVideoSize)
    }

    elem.addEventListener('loadedmetadata', () => {
        elem.play()
        adjustVideoSize()
        if (callback) callback(elem.srcObject)
    })


    return video
}
