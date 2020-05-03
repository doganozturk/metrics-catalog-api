# MetricsCatalog.API

[![CircleCI](https://circleci.com/gh/doganozturk/metrics-catalog-api/tree/master.svg?style=shield&circle-token=cd068c8a9e6f1b5093de193726ef3b4eb1d4a0cb)](https://circleci.com/gh/doganozturk/metrics-catalog-api/tree/master)

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

### Get a list of Metrics with date range & host filters

#### Request

`GET /metrics/?host={host}&date_min={date_min}&date_max={date_max}`

    curl -i -H 'Accept: application/json' https://metrics-catalog-api.herokuapp.com/metrics/?host=doganozturk.dev&date_min=2020-05-01T22:07:48.822Z&date_max=2020-05-01T22:07:52.822Z

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
