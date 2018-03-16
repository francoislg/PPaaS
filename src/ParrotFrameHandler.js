const fs = require('fs');
const Canvas = require('canvas');
const Image = Canvas.Image;

function ParrotFrameHandler(parrotConfig) {
    this.width = parrotConfig.getWidth();
    this.height = parrotConfig.getHeight();
    this.context = new Canvas(this.width, this.height).getContext('2d');
    this.context.fillStyle = "rgba(255,255,255,0)";
    this.context.fillRect(0, 0, this.width, this.height);
}

ParrotFrameHandler.prototype.applyColor = function(color) {
    const imageData = this.context.getImageData(0, 0, this.width, this.height);
    const targetRed = parseInt(color.substring(0, 2), 16);
    const targetGreen = parseInt(color.substring(2, 4), 16);
    const targetBlue = parseInt(color.substring(4, 6), 16);
    for (let index=0, length=imageData.data.length; index < length; index += 4) {
        let red = imageData.data[index];
        let green = imageData.data[index + 1];
        let blue = imageData.data[index + 2];
        console.log({
            r:red,
            g:green,
            b: blue
        });
        // Grey parrot color test
        if (red == 138 && green == 138 && blue == 138) {
            imageData.data[index] = targetRed;
            imageData.data[index + 1] = targetGreen;
            imageData.data[index + 2] = targetBlue;
        }
    }
    this.context.putImageData(imageData, 0, 0);
}

ParrotFrameHandler.prototype.addImage = function(image, offsetX, offsetY) {
    this.context.drawImage(image, offsetX || 0, offsetY || 0);
}

ParrotFrameHandler.prototype.addResizedImage = function(image, offsetX, offsetY, width, height) {
    this.context.drawImage(image, offsetX || 0, offsetY || 0, width, height);
}

ParrotFrameHandler.prototype.getFrame = function() {
    return this.context;
}

module.exports = ParrotFrameHandler;