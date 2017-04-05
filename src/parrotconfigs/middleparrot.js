var config = {
    followingFrames:[{
        x:9, y:10
    },{
        x:4, y:11
    },{
        x:4, y:12
    },{
        x:6, y:14
    },{
        x:10, y:16
    },
    // Flipped
    {
        x:16, y:14, flipY: true
    },{
        x:20, y:12, flipY: true
    },{
        x:22, y:11, flipY: true
    },{
        x:22, y:10, flipY: true
    },{
        x:20, y:9, flipY: true
    },
    // Last two extra frames
    {
        x:15, y:9, flipY: true
    },{
        x:16, y:7
    }]
}

module.exports = config;