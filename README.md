# Frontend Application Challenge

> Build a one-page React.js app powered by Next.js. The application should consume a JSON list of coupons and represent the coupon data in a tabular format as shown in the attached images.

## Requirements

- [x] Optimized for desktop view
- [x] Can be sorted via header row
- [x] pagination - 20 records per page

## Bonus Points

- [x] Tests for 1 scenario
- [x] Dockerfile

## Running on development

Inside the root project directory, install the app dependencies by running:

#### `npm install` or `yarn install`

Then run the app in development mode:

#### `npm dev` or `yarn dev`

Open http://localhost:3000/ to view it in browser.

## Running tests

#### `npm test` or `yarn test`

## Docker

Start the Docker app.

Build a docker image:

`docker build -t couponapp .`

after builds successfully, run a container for the newly created image:
`docker run --publish 5000:3000 --detach --name COUPON_APP_CONTAINER couponapp`

Open https://localhost:5000 on your browser to see the app running locally.
