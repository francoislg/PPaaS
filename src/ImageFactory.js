const fs = require('fs');
const config = require("./config");
const Image = require("canvas").Image;
const request = require("request").defaults({ encoding: null });

function ImageFactory() {
    this.loadedImages = {};
    this.isInCache = function(key) {
        return this.loadedImages.hasOwnProperty(key);
    }
    this.getFromCache = function(key) {
        return this.loadedImages[key];
    }
    this.addToCache = function(key, image) {
        this.loadedImages[key] = image;
    }
}

ImageFactory.prototype.get = function(image) {
    if(this.isURL(image)) {
        return this.fromUrl(image);
    } else {
        return this.fromFile(image);
    }
}

ImageFactory.prototype.fromFileSync = function(fileName) {
    var img = new Image();
    img.src = fs.readFileSync(fileName);
    this.addToCache(fileName, img);
    return img;
}

ImageFactory.prototype.isURL = function(url) {
    return url.indexOf("http") == 0;
}

ImageFactory.prototype.fromFile = function(fileName) {
    return new Promise((resolve, reject) => {
        if (this.isInCache(fileName)) {
            resolve(this.getFromCache(fileName));
        } else {
            fs.readFile(fileName, (err, data) => {
                if (!err) {
                    var img = new Image();
                    img.src = data;
                    this.addToCache(fileName, img);
                    resolve(img);
                } else {
                    reject(err);
                }
            });
        }
    });
}

ImageFactory.prototype.fromUrl = function(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            var img = new Image();
            img.src = body;
            resolve(img);
        });
    });
}

module.exports = ImageFactory;