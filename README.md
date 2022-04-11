# marvel-ts
An unofficial TypeScript wrapper for [Marvel Comics API](https://developer.marvel.com/). 
Suitable for client and server-side usage.

## Install
```javascript
npm i marvel-ts
```

## Usage

#### Prerequisites
* Go to https://developer.marvel.com/ and generate your API keys.
* Add your domains as authorized referrers.
* For development, you can use `*.*`.

#### Import
```javascript
import { MarvelAPI } from 'marvel-ts';
```

#### Instantiate
For client-side / browser you only need to provide your public key.
```javascript
const PUBLIC_KEY = 'MY_PUBLIC_KEY';

const marvelAPI = new MarvelAPI(PUBLIC_KEY);
```

For server-side you will need to provide your public and private key.
```javascript
const PUBLIC_KEY = 'MY_PUBLIC_KEY';
const PRIVATE_KEY = 'MY_PRIVATE_KEY';

const marvelAPI = new MarvelAPI(PUBLIC_KEY, PRIVATE_KEY);
```

You can also pass in [rateLimit](https://www.npmjs.com/package/axios-rate-limit) options.
By default, the wrapper does not apply a rate limit.

```javascript
const PUBLIC_KEY = 'MY_PUBLIC_KEY';
const PRIVATE_KEY = 'MY_PRIVATE_KEY';

const marvelAPI = new MarvelAPI(PUBLIC_KEY, PRIVATE_KEY, { maxRequests: 4, perMilliseconds: 1000, maxRPS: 4 });
```

#### Call Endpoint
All endpoints described in the API [documentation](https://developer.marvel.com/docs) are available. For example:
```javascript
const response = await marvelAPI.getCharacters();
```

### Getting Data
The response from endpoints are typed to mirror those from the documentation. To get the results of the call, use destructuring. For example:
```javascript
const response = await marvelAPI.getCharacters();

const { data: { results } } = response;

const character = results[0];

```

#### Using parameters
All endpoints which do not call for a identifier e.g `characterId`, can optionally be passed parameters. See [documentation](https://developer.marvel.com/docs) for more details.
```javascript
const response = await marvelAPI.getCharacters({ nameStartsWith: "spider", limit: 5 });
```

