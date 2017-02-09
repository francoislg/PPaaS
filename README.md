# PPaaS
Party Parrot as a Service

## PPaaS UI
You can use the [PPaaS UI](https://parrotify.github.io/) to create party parrots in a friendlier manner (see its [GitHub repo](https://github.com/parrotify/parrotify.github.io)).

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
* flipOverlayY
* flipOverlayX

https://ppaas.herokuapp.com/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3

Here is the result: ![Upvote Party Parrot](https://ppaas.herokuapp.com/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3 "Upvote Party Parrot")

## Delay

You can adjust the delay between frames using the delay query parameter: 

https://ppaas.herokuapp.com/partyparrot?delay=20

Here is the result: ![Fast Parrot](https://ppaas.herokuapp.com/partyparrot?delay=20 "Fast Parrot")

## Base Parrot

You can change the base parrot using `/partyparrot/:baseparrot`. The list of supported base parrots is in the `baseparrots` folder.

https://ppaas.herokuapp.com/partyparrot/rightparrot

Here is the result: ![Right Parrot](https://ppaas.herokuapp.com/partyparrot/rightparrot "Right Parrot")
