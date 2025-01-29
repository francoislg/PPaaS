const { loadImage } = require("@napi-rs/canvas");

function ImageFactory() {
  this.loadedImages = {};
  this.isInCache = function (key) {
    return this.loadedImages.hasOwnProperty(key);
  };
  this.getFromCache = function (key) {
    return this.loadedImages[key];
  };
  this.addToCache = function (key, image) {
    this.loadedImages[key] = image;
  };
}

ImageFactory.prototype.get = function (image) {
  if (this.isURL(image)) {
    return this.fromUrl(image);
  } else {
    return this.fromFile(image);
  }
};

ImageFactory.prototype.isURL = function (url) {
  return url.indexOf("http") == 0;
};

ImageFactory.prototype.fromFile = async function (fileName) {
  if (this.isInCache(fileName)) {
    return this.getFromCache(fileName);
  }

  const image = await loadImage(fileName);
  this.addToCache(fileName, image);
  return image;
};

ImageFactory.prototype.fromUrl = function (url) {
  return loadImage(url);
};

module.exports = ImageFactory;
