<a href="https://middle-messenger-praktikum-yandex-zeta.vercel.app" target="_blank" rel="noopener noreferrer">
<p align="center">
 <img src="https://user-images.githubusercontent.com/106176669/198019198-45e8703f-c342-48ac-94e5-1e7871631cfe.png" alt="logo" width="250" draggable="false">
</p>
</a>
<p align="center">
  <span>English</span> |
  <a href="https://github.com/HereHaveTheseFlowers/middle.messenger.praktikum.yandex/blob/main/README.ru.md">Русский</a>
</p>

## **<p align="center">Vacate - a simple, yet cozy & comfortable web chat!</p>**
<p align="center">
This is a full-working web messenger, which, among other things, can send messages via WebSocket. Building via Webpack and virtualization via Docker are set up, the project is auto-deployed to Heroku, linters are connected. This is my project for the Yandex "Middle-Frontend" Course.
</p>

## Deployment

You can check the demo launched on vercel here:
https://middle-messenger-praktikum-yandex-zeta.vercel.app
<a href="https://middle-messenger-praktikum-yandex-zeta.vercel.app" target="_blank" rel="noopener noreferrer">
<img src="https://user-images.githubusercontent.com/106176669/198018966-532e033a-c1c3-4137-8882-8da6bd2651c5.png" alt="vacate-showcase-2" style="max-width: 100%;" draggable="false">
</a>

## Tools
- Webpack
- Typescript
- Handlebars
- Sass
- Postcss
- Mocha & Chai
- Eslint and stylelint
- Docker
- Auto-deploy to Heroku (heroku is dead, now Vercel)

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

 - `docker build -t chatapp .` — creating an image.

 - `docker run -p 3000:3000 chatapp` — running the image locally.

## Design mockup
https://www.figma.com/file/1TpBSm2GhzmmtlsJgFTXmf/Chat_SergeiKozlov?node-id=0%3A1
