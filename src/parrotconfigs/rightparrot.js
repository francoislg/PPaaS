var timesBigger = 9; // Very approximately accurate.

var config = {
    width:320,
    height:229,
    flipY:true,

    followingFrames:[{
        x:16, y:11
    },{
        x:12, y:10
    },{
        x:9, y:10
    },{
        x:4, y:11
    },{
        x:4, y:12
    },{
        x:6, y:14
    },{
        x:10, y:16
    },{
        x:15, y:14
    },{
        x:17, y:13
    },{
        x:18, y:12
    }].map(frame => {
        return {
            x: 229 - (frame.x * timesBigger),
            y: frame.y * timesBigger
        };
    })
}

module.exports = config;
