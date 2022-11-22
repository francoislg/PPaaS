# PPaaS

Party Parrot as a Service

## ![warning-parrot](https://partyparrotasaservice.vercel.app/api/partyparrot?overlay=https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-warning-icon.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-10&colors=fff7e8,fae0af,f7c972,f5ba4c,f2af30) **NOTICE** ![warning-parrot](https://partyparrotasaservice.vercel.app/api/partyparrot?overlay=https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-warning-icon.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-10&colors=fff7e8,fae0af,f7c972,f5ba4c,f2af30)

Since Heroku is deprecating their free tier, the API has been migrated to Vercel. The URL changed from `https://ppaas.herokuapp.com` to `https://partyparrotasaservice.vercel.app/api` (yes, including the `/api` part).

Sorry for the inconvenience. (But not quite, let's put all the blame on corporate)

## PPaaS UI
You can use the [PPaaS UI](https://parrotify.github.io/) to create party parrots in a friendlier manner (see its [GitHub repo](https://github.com/parrotify/parrotify.github.io)).

## Basic call

https://partyparrotasaservice.vercel.app/api/partyparrot

![Party Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot "Party Parrot")

## Overlay

You can add an overlay that follows the parrot using the overlay query parameter:

https://partyparrotasaservice.vercel.app/api/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png

Here is the result: ![Upvote Party Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png "Upvote Party Parrot")

The image is not shown because it is too big and is not rendered in the canvas.

### Overlay Parameters

To solve this problem, it is possible to adjust it the overlay with the following parameters:

* overlayHeight
* overlayWidth
* overlayOffsetX
* overlayOffsetY
* flipOverlayY (doesn't seem to work at the moment)
* flipOverlayX (doesn't seem to work at the moment)

https://partyparrotasaservice.vercel.app/api/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3

Here is the result: ![Upvote Party Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3 "Upvote Party Parrot")

## Delay

You can adjust the delay between frames using the `delay` query parameter: 

https://partyparrotasaservice.vercel.app/api/partyparrot?delay=20

Here is the result: ![Fast Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot?delay=20 "Fast Parrot")

## Colors

You can set the colors for each frame using the `colors` query parameter:

https://partyparrotasaservice.vercel.app/api/partyparrot/middleparrot?colors=00CCCC,00AAAA,008888,006666,004444&delay=50

Here is the result: ![Green-ish Middle Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot/middleparrot?colors=00CCCC,00AAAA,008888,006666,004444&delay=50 "Green-ish Middle Parrot")

## Base Parrot

You can change the base parrot using `/partyparrot/:baseparrot`.

The list of supported base parrots is in the `baseparrots` folder.

Note that the changing the base parrot also supports all the other parameters.

https://partyparrotasaservice.vercel.app/api/partyparrot/rightparrot

Here is the result: ![Right Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot/rightparrot? "Right Parrot")

For a bigger party:

https://partyparrotasaservice.vercel.app/api/partyparrot/mega?overlay=http://vignette3.wikia.nocookie.net/runescape2/images/0/0a/Wizard_hat_(t)_detail.png&overlayWidth=100&overlayHeight=100&overlayOffsetY=-150

![Mega Wizard Parrot](https://partyparrotasaservice.vercel.app/api/partyparrot/mega?v2&overlayWidth=100&overlayHeight=100&overlayOffsetY=-150&overlay=http://vignette3.wikia.nocookie.net/runescape2/images/0/0a/Wizard_hat_(t)_detail.png? "Mega Wizard Parrot")

https://partyparrotasaservice.vercel.app/api/baseparrots returns the list of available parrots.

## Weird things