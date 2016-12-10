const ParrotConstructor = require("./src/ParrotConstructor");
const path = require("path");
const express = require("express");
const request = require("request-promise");

var app = express();

app.all("/partyparrot", (req, res, next) => {
    console.log("request received");
    next();
});

app.get("/partyparrot", (req, res, done) => {
    let fileName = "test.gif";
    res.writeHead(200, { "Content-Type":"image/gif" });
    let parrotConstructor = new ParrotConstructor(res);
    var promises = [];
    if(req.query.overlay) {
        var overlayPromise = parrotConstructor.addFollowingOverlayImage(req.query.overlay, 
                                                                        parseInt(req.query.overlayOffsetX), 
                                                                        parseInt(req.query.overlayOffsetY),
                                                                        req.query.overlayWidth,
                                                                        req.query.overlayHeight);
        promises.push(overlayPromise);
    }
    if (promises.length > 0) {
        Promise.all(promises).then(() => {
            parrotConstructor.finish();
        }).catch((reason) => {
            console.error(reason);
        })
    } else {
        parrotConstructor.finish();
    }
});

app.listen(process.env.PORT || 8080);
