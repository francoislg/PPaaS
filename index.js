const ParrotConstructor = require("./src/ParrotConstructor");
const path = require("path");
const express = require("express");
const request = require("request-promise");

var app = express();

app.get("/partyparrot", (req, res, done) => {
    handleRequest(res, req.query);
});

function handleRequest(res, queryParams) {
    let fileName = "generatedparrot.gif";
    res.writeHead(200, { "Content-Type":"image/gif" });

    let parrotConstructor = new ParrotConstructor(res, queryParams);
    var promises = [];
    if(queryParams.overlay) {
        var overlayPromise = parrotConstructor.addFollowingOverlayImage(queryParams.overlay, 
                                                                        parseInt(queryParams.overlayOffsetX), 
                                                                        parseInt(queryParams.overlayOffsetY),
                                                                        queryParams.overlayWidth,
                                                                        queryParams.overlayHeight);
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
}

app.listen(process.env.PORT || 8080);
