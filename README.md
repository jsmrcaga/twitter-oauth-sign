# twitter-oauth-sign

A small module to sign twitter requests.

## Require

`var twitter_sign = require('twitter-oauth-sign');`

## API

### `ts.sign(method, url, params, keys)`

#### `method`

The method used to make the request, can be `GET` or `POST` (or any Twitter-accepted method).

#### `url`

The url the request is being sent to. Example: `"https://api.twitter.com/1/statuses/update.json"`

#### `params`

All the `oauth` params needed for the request. Check the test to see a full example.

#### `keys`
An object containing `consumer_secret` (**required**) and `oauth_token` (*optional*). 
Indeed, `oauth_token` is not needed when requesting one (duh?).