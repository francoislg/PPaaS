var timesBigger = 9; // Very approximately accurate.

var config = {
    width:320,
    height:229,
    followingFrames:Array(10).fill({
        x:5, y:12
    }).map(frame => {
        return {
            x: frame.x * timesBigger,
            y: frame.y * timesBigger
        };
    })
}

module.exports = config;