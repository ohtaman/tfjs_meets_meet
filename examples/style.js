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
        image(resultImg, 0, 0, webcam.width, webcam.height)
        
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
