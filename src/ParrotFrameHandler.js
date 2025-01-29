const Canvas = require("@napi-rs/canvas").Canvas;

class ParrotFrameHandler {
  constructor(parrotConfig) {
    this.width = parrotConfig.getWidth();
    this.height = parrotConfig.getHeight();
    this.canvas = new Canvas(this.width, this.height);
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "#00000000";
    this.context.fillRect(0, 0, this.width, this.height);
  }

  applyColor(color) {
    const imageData = this.context.getImageData(0, 0, this.width, this.height);
    const targetRed = parseInt(color.substring(0, 2), 16);
    const targetGreen = parseInt(color.substring(2, 4), 16);
    const targetBlue = parseInt(color.substring(4, 6), 16);
    for (
      let index = 0, length = imageData.data.length;
      index < length;
      index += 4
    ) {
      let red = imageData.data[index];
      let green = imageData.data[index + 1];
      let blue = imageData.data[index + 2];
      let alpha = imageData.data[index + 3];
      if (red == 255 && green == 255 && blue == 255 && alpha == 255) {
        imageData.data[index] = targetRed;
        imageData.data[index + 1] = targetGreen;
        imageData.data[index + 2] = targetBlue;
      }
    }
    this.context.putImageData(imageData, 0, 0);
  }

  addImage(image, offsetX = 0, offsetY = 0) {
    this.context.drawImage(image, offsetX, offsetY);
  }

  addResizedImage(image, offsetX = 0, offsetY = 0, width, height) {
    this.context.drawImage(image, offsetX, offsetY, width, height);
  }

  getFrame() {
    return this.context;
  }
}

module.exports = ParrotFrameHandler;
