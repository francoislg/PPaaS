const ParrotConstructor = require("./src/ParrotConstructor");
const ParrotOptionsValidator = require("./src/ParrotOptionsValidator");
const path = require("path");
const fs = require('fs')
const express = require("express");
const request = require("request-promise");

var app = express();

app.get("/partyparrot", (req, res, done) => {
    handleRequest(res, req.query);
});

app.get("/baseparrots", (req, res, done) => {
    let srcpath = "./baseparrots";
    let folders = fs.readdirSync(path.resolve(srcpath)).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
    res.end(`["${folders.join('","')}"]`);
});

app.get("/partyparrot/:baseparrot", (req, res, done) => {
    req.query.baseparrot = req.params.baseparrot;
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

    let parrotConstructor = new ParrotConstructor();
    var promises = [];
    if(queryParams.baseparrot) {
        parrotConstructor.setBaseParrot(queryParams.baseparrot);
    }

    parrotConstructor.start(res, {
        delay: queryParams.delay,
        colors: queryParams.colors ? queryParams.colors.split(",") : null
    });

    if(queryParams.overlay) {
        var overlayPromise = parrotConstructor.addFollowingOverlayImage(queryParams.overlay, 
                                                                        parseInt(queryParams.overlayOffsetX), 
                                                                        parseInt(queryParams.overlayOffsetY),
                                                                        queryParams.overlayWidth,
                                                                        queryParams.overlayHeight,
                                                                        queryParams.flipOverlayX ? true : false,
                                                                        queryParams.flipOverlayY ? true : false);
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
