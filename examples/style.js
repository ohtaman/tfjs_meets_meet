STYLES = {
    wave: "https://ml5js.github.io/ml5-examples/p5js/StyleTransfer/StyleTransfer_Image/models/wave",
    udnie: "https://ml5js.github.io/ml5-examples/p5js/StyleTransfer/StyleTransfer_Image/models/udnie"
}
  
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    webcam = createCapture(VIDEO, (stream) => {
        style = ml5.styleTransfer(getStyle(), webcam, transfer);
    });
    resultImg = createImg('', '');
    resultImg.hide();
    webcam.hide();
}

function transfer(){
    style.transfer((err, img) => {
        background(0)
        resultImg.attribute('src', img.src)

        if (canvas.height / canvas.width > webcam.height / webcam.width) {
            width = canvas.width
            height = webcam.height*canvas.width/webcam.width
        } else {
            width = webcam.width*canvas.height/webcam.height
            height = canvas.height
        }
    

        image(resultImg, int((canvas.width - width)/2), int((canvas.height - height)/2), width, height)
        
        requestAnimationFrame(transfer)
    })
}

function windowResized () {
    resizeCanvas(windowWidth, windowHeight)
}

function getStyle() {
    const style = window.location.href.split('?')[1]
    if (style) {
        return STYLES[style]
    } else {
        return STYLES["udnie"]
    }
}
