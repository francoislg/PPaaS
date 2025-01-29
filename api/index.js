const ParrotConstructor = require("../src/ParrotConstructor");
const ParrotOptionsValidator = require("../src/ParrotOptionsValidator");
const ImageFactory = require("../src/ImageFactory");
const path = require("path");
const fs = require("fs");
const express = require("express");

var app = express();

app.get("/api/partyparrot", (req, res, done) => {
  handleRequest(res, req.query).then(() => done());
});

app.get("/api/baseparrots", (req, res, done) => {
  let srcpath = "./baseparrots";
  let folders = fs
    .readdirSync(path.resolve(srcpath))
    .filter((file) => fs.statSync(path.join(srcpath, file)).isDirectory());
  res.end(`["${folders.join('","')}"]`);
});

app.get("/api/partyparrot/:baseparrot", (req, res, done) => {
  req.query.baseparrot = req.params.baseparrot;
  handleRequest(res, req.query).then(done);
});

async function handleRequest(res, queryParams) {
  let validator = new ParrotOptionsValidator();

  let error = validator.validate(queryParams);
  if (!error) {
    await constructParrot(res, queryParams);
  } else {
    console.error(error);
    res.status(400).end(error);
  }
}

const imageFactory = new ImageFactory();

async function constructParrot(res, queryParams) {
  res.writeHead(200, { "Content-Type": "image/gif" });

  const parrotConstructor = new ParrotConstructor(imageFactory);

  if (queryParams.baseparrot) {
    parrotConstructor.setBaseParrot(queryParams.baseparrot);
  }

  await parrotConstructor.start(res, {
    delay: queryParams.delay,
    colors: queryParams.colors ? queryParams.colors.split(",") : null,
  });

  if (queryParams.overlay) {
    await parrotConstructor.addFollowingOverlayImage(
      queryParams.overlay,
      parseInt(queryParams.overlayOffsetX),
      parseInt(queryParams.overlayOffsetY),
      queryParams.overlayWidth,
      queryParams.overlayHeight,
      queryParams.flipOverlayX ? true : false,
      queryParams.flipOverlayY ? true : false
    );
  }

  await parrotConstructor.finish();
}

app.listen(process.env.PORT || 8080);
