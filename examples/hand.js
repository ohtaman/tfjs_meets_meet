let canvas
let capture
let model
let hand = false
let REDLINE_WIDTH = 20

function preload () {
    handpose.load().then(res => model = res)
}

function setup () {
    canvas = createCanvas(windowWidth, windowHeight)
    capture = createCapture(VIDEO)
    capture.hide()
}

function draw () {
    if (canvas.height / canvas.width > capture.height / capture.width) {
        width = canvas.width
        height = capture.height*canvas.width/capture.width
    } else {
        width = capture.width*canvas.height/capture.height
        height = canvas.height
    }

    if (hand) {
        background(255, 0, 0)
        image(
            capture,
            int((canvas.width - width)/2) + REDLINE_WIDTH,
            int((canvas.heigh - height)/2) + REDLINE_WIDTH, 
            width - 2*REDLINE_WIDTH,
            height - 2*REDLINE_WIDTH
        )
    } else {
        background(0, 0, 0)
        image(capture, int((canvas.width - width)/2), int((canvas.heigh - height)/2), width, height)
    }
    
    if (model && capture.loadedmetadata) {
        model.estimateHands(capture.elt).then((res) => hand = res.length > 0)
    }
}

function windowResized () {
    resizeCanvas(windowWidth, windowHeight)
}