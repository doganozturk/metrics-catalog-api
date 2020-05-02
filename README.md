# MetricsCatalog.API

`metrics-catalog-api` is a little REST API collecting and serving client-side performance data such as TTFB, FCB etc. `metrics-catalog-api` does this using [`metrics-catalog-js`](https://github.com/doganozturk/metrics-catalog-js), a tiny client-side library that collects page performance data and posts it to this API.

## Features
- Uses Nest.js, a Node.js backend framework that uses TypeScript & clean architecture patterns.
- Handles min 200 RPS (look below for explanation).
- Can return data between spesific dates, filtering capability.

## Get started

### Get a list of Metrics

#### Request

`GET /metrics/`

    curl -i -H 'Accept: application/json' https://metrics-catalog-api.herokuapp.com/metrics

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

### Get a list of Metrics with date range filter

#### Request

`GET /metrics/?date_min={date_min}&date_max={date_max}`

    curl -i -H 'Accept: application/json' https://metrics-catalog-api.herokuapp.com/metrics/?date_min=2020-05-01T22:07:48.822Z&date_max=2020-05-01T22:07:52.822Z

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

### Create a new Metric

#### Request

`POST /metrics/`

    curl -XPOST -H "Content-type: application/json" -d '{
        "host": "doganozturk.dev",
        "date": "2020-05-01T00:02:12.852Z",
        "fcp": 3169.5049999980256,
        "resources": [
            {
                "name": "http://localhost:8080/browser-sync/browser-sync-client.js?v=2.26.7",
                "requestStart": 3083.1250000046566,
                "responseEnd": 3128.1249999883585,
                "startTime": 3057.024999987334
            },
            {
                "name": "http://localhost:8080/public/images/avatar.jpg",
                "requestStart": 3120.379999978468,
                "responseEnd": 3160.779999976512,
                "startTime": 3118.789999978617
            },
            {
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcJN",
                "requestStart": 3191.9399999896996,
                "responseEnd": 3206.2199999927543,
                "startTime": 3174.445000011474
            },
            {
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcKX&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3256.1250000144355,
                "responseEnd": 3258.9199999929406,
                "startTime": 3248.8000000012107
            },
            {
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcKs&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3271.9550000038,
                "responseEnd": 3275.054999976419,
                "startTime": 3268.470000009984
            },
            {
                "name": "http://localhost:8080/site.webmanifest",
                "requestStart": 3278.355000016745,
                "responseEnd": 3279.9099999829195,
                "startTime": 3273.994999995921
            },
            {
                "name": "http://localhost:8080/public/favicon/favicon-32x32.png",
                "requestStart": 3276.8899999791756,
                "responseEnd": 3285.565000027418,
                "startTime": 3276.639999996405
            },
            {
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcLC&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3296.555000008084,
                "responseEnd": 3297.7800000226125,
                "startTime": 3292.0949999825098
            },
            {
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcLE&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3304.4649999937974,
                "responseEnd": 3401.3450000202283,
                "startTime": 3293.1400000234134
            },
            {
                "name": "http://localhost:8080/public/favicon/android-chrome-192x192.png",
                "requestStart": 3299.9999999883585,
                "responseEnd": 3308.695000014268,
                "startTime": 3299.219999986235
            }
        ],
        "ttfb": 5.1300000050105155,
        "domContentLoaded": 2.3250000085681677,
        "windowLoaded": 1.7499999958090484
    }' 'https://metrics-catalog-api.herokuapp.com/metrics'

#### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
        "_id": "5eacad4ee1212116a240d407",
        "host": "doganozturk.dev",
        "date": "2020-05-01T00:02:12.852Z",
        "fcp": 3169.5049999980256,
        "resources": [
            {
                "_id": "5eacad4ee1212116a240d408",
                "name": "http://localhost:8080/browser-sync/browser-sync-client.js?v=2.26.7",
                "requestStart": 3083.1250000046566,
                "responseEnd": 3128.1249999883585,
                "startTime": 3057.024999987334
            },
            {
                "_id": "5eacad4ee1212116a240d409",
                "name": "http://localhost:8080/public/images/avatar.jpg",
                "requestStart": 3120.379999978468,
                "responseEnd": 3160.779999976512,
                "startTime": 3118.789999978617
            },
            {
                "_id": "5eacad4ee1212116a240d40a",
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcJN",
                "requestStart": 3191.9399999896996,
                "responseEnd": 3206.2199999927543,
                "startTime": 3174.445000011474
            },
            {
                "_id": "5eacad4ee1212116a240d40b",
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcKX&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3256.1250000144355,
                "responseEnd": 3258.9199999929406,
                "startTime": 3248.8000000012107
            },
            {
                "_id": "5eacad4ee1212116a240d40c",
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcKs&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3271.9550000038,
                "responseEnd": 3275.054999976419,
                "startTime": 3268.470000009984
            },
            {
                "_id": "5eacad4ee1212116a240d40d",
                "name": "http://localhost:8080/site.webmanifest",
                "requestStart": 3278.355000016745,
                "responseEnd": 3279.9099999829195,
                "startTime": 3273.994999995921
            },
            {
                "_id": "5eacad4ee1212116a240d40e",
                "name": "http://localhost:8080/public/favicon/favicon-32x32.png",
                "requestStart": 3276.8899999791756,
                "responseEnd": 3285.565000027418,
                "startTime": 3276.639999996405
            },
            {
                "_id": "5eacad4ee1212116a240d40f",
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcLC&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3296.555000008084,
                "responseEnd": 3297.7800000226125,
                "startTime": 3292.0949999825098
            },
            {
                "_id": "5eacad4ee1212116a240d410",
                "name": "http://localhost:8080/browser-sync/socket.io/?EIO=3&transport=polling&t=N7DYcLE&sid=2Ov42hi2x4Aw9NR3AAAA",
                "requestStart": 3304.4649999937974,
                "responseEnd": 3401.3450000202283,
                "startTime": 3293.1400000234134
            },
            {
                "_id": "5eacad4ee1212116a240d411",
                "name": "http://localhost:8080/public/favicon/android-chrome-192x192.png",
                "requestStart": 3299.9999999883585,
                "responseEnd": 3308.695000014268,
                "startTime": 3299.219999986235
            }
        ],
        "ttfb": 5.1300000050105155,
        "domContentLoaded": 2.3250000085681677,
        "windowLoaded": 1.7499999958090484,
        "__v": 0
    }

## Load test

MetricsCatalog.API can handle approximately 200 requests per second. You can review test report using `npm run test:load` or command below.

```
loadtest -n 1000 -c 1 --rps 200 http://localhost:3000/metrics/
```

## Local development setup
1. Download the repository.
2. Get Node.js v12.16.3 and install it if you haven't already.
3. Use ```npm install``` to install the necessary dependencies.
4. The source code is written in TypeScript in the `src` directory.
5. Run ```npm run start:dev``` to run server on development mode.
6. Run ```npm test``` to run the tests.

## Contribution
Pull requests and feature requests are welcome!

## Author
* **Doğan Öztürk** - [Github](https://github.com/doganozturk)
