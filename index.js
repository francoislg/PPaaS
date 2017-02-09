const ParrotConstructor = require("./src/ParrotConstructor");
const ParrotOptionsValidator = require("./src/ParrotOptionsValidator");
const path = require("path");
const express = require("express");
const request = require("request-promise");

var app = express();

app.get("/partyparrot", (req, res, done) => {
    handleRequest(res, req.query);
});

function handleRequest(res, queryParams) {
    let validator = new ParrotOptionsValidator();
    
    let error = validator.validate(queryParams);
    if(!error) {
        constructParrot(res, queryParams);
    } else {
        console.error(error);
        res.status(400).end(error);
    }
}

function constructParrot(res, queryParams) {
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
        });
    } else {
        parrotConstructor.finish();
    }
}

app.listen(process.env.PORT || 8080);
