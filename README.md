# PPaaS
Party Parrot as a Service

## Basic call

https://ppaas.herokuapp.com/partyparrot

![Party Parrot](https://ppaas.herokuapp.com/partyparrot "Party Parrot")

## Overlay

You can add an overlay that follows the parrot using the overlay query parameter:

https://ppaas.herokuapp.com/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png

Here is the result: ![Upvote Party Parrot](https://ppaas.herokuapp.com/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png "Upvote Party Parrot")

The image is not shown because it is too big and is not rendered in the canvas.

### Overlay Parameters

To solve this problem, it is possible to adjust it the overlay with the following parameters:

* overlayHeight
* overlayWidth
* overlayOffsetX
* overlayOffsetY

https://ppaas.herokuapp.com/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3

Here is the result: ![Upvote Party Parrot](https://ppaas.herokuapp.com/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3 "Upvote Party Parrot")
