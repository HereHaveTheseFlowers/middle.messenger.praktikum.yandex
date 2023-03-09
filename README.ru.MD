<a href="https://middle-messenger-praktikum-yandex-zeta.vercel.app" target="_blank" rel="noopener noreferrer">
<p align="center">
 <img src="https://user-images.githubusercontent.com/106176669/198019198-45e8703f-c342-48ac-94e5-1e7871631cfe.png" alt="logo" width="250" draggable="false">
</p>
</a>

## **<p align="center">Vacate - простой и уютный веб-мессенджер!</p>**
<p align="center">
Vacate - полноценный веб-мессенджер, который, помимо всего прочего, умеет отправлять сообщения через WebSocket. Настроена сборка через Webpack и виртуализация через Docker, проект автодеплоен на Vercel, подключены линтеры. Данный проект был выполнен для курса "Миддл-фронтенд Разработчик" от Яндекс Практикума.
</p>

## Деплой

Демо запущенное на Vercel можно увидеть здесь:
https://middle-messenger-praktikum-yandex-zeta.vercel.app
<a href="https://middle-messenger-praktikum-yandex-zeta.vercel.app" target="_blank" rel="noopener noreferrer">
<img src="https://user-images.githubusercontent.com/106176669/198018966-532e033a-c1c3-4137-8882-8da6bd2651c5.png" alt="vacate-showcase-2" style="max-width: 100%;" draggable="false">
</a>

## Стэк
- Webpack
- Typescript
- Handlebars
- Sass
- Postcss
- Mocha & Chai
- Eslint и stylelint
- Docker
- Авто-деплой на Vercel

## Установка
Следующие команды используются, чтобы запустить проект:

- `npm run start` — Собрать и запустить проект на порту 3000 с помощью Express и Webpack.
- `$env:PORT="8000" ; npm run start` — Также как и выше, но проект запускается на порте, по вашему выбору.
- `PORT=4444 npm run start` — Также, как и выше, но для пользователей Mac.
- `npm run dev` — Построить и запустить с проектс помощью Webpack в режиме разработчика.
- `npm run build` — Собрать проект с помощью Webpack.
- `npm run test` — Запускает тесты Mocha&Chai.
- `npm run lint` — Запускает eslint и stylelint.

## Использование Docker

 - `docker build -t chatapp .` — creating an image.

 - `docker run -p 3000:3000 chatapp` — running the image locally.

## Мокап дизайна

https://www.figma.com/file/1TpBSm2GhzmmtlsJgFTXmf/Chat_SergeiKozlov?node-id=0%3A1
