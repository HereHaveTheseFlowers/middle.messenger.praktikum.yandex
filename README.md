## **Description**
Vacate - a simple, yet cozy & comfortable web chat! This is a single page web application.

## Demo
You can check the demo launched on heroku here:
https://herehavetheseflowers-vacate.herokuapp.com/

## Design mockup
https://www.figma.com/file/1TpBSm2GhzmmtlsJgFTXmf/Chat_SergeiKozlov?node-id=0%3A1

## Installation
The following are the commands required to run the project:

- `npm run start` — build and launch the project on port 3000 using Express and Parcel.
- `npm run dev` — build and run using Parcel to work on the project.
- `npm run build` — build the project using Parcel.
- `$env:PORT="8000" ; npm run start` — same as the above, but the project starts on the port of your choice. For Windows users.
- `PORT=4444 npm run start` — same as the above, but for Mac users.

## Docker usage

 - `docker build -t chatapp .` — creating an image

 - `docker run -p 3000:3000 chatapp` — running the image