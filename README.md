## **Description**
Vacate - a simple, yet cozy & comfortable web chat! This is a single page web application.

## Demo
You can check the demo launched on heroku here:
https://herehavetheseflowers-vacate.herokuapp.com/

## Techstack
Some of the tools used while building the project:
- Webpack
- Typescript
- Sass
- Mocha & Chai
- Docker
- Handlebars
- Postcss
- Eslint and stylelint

## Installation
The following are the commands required to run the project on your machine:

- `npm run start` — build and launch the project on port 3000 using Express and Webpack.
- `npm run dev` — build and run using Webpack to work on the project.
- `npm run build` — build the project using Webpack.
- `$env:PORT="8000" ; npm run start` — same as the above, but the project starts on the port of your choice. For Windows users.
- `PORT=4444 npm run start` — same as the above, but for Mac users.
- `npm run test` — runs mocha&Chai tests.
- `npm run lint` — runs eslint and stylelint.

## Docker usage

 - `docker build -t chatapp .` — creating an image

 - `docker run -p 3000:3000 chatapp` — running the image

## Design mockup
https://www.figma.com/file/1TpBSm2GhzmmtlsJgFTXmf/Chat_SergeiKozlov?node-id=0%3A1