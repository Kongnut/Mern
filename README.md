# Mern
This repository is redesign from ATour repository.
Redesign both front-end and back-end.
Using react, express and mongo

Right now it's able to
1. Login with facebook (remove normal login and register)
2. Publish/Unpublish/Delete Tour
3. Edit Tour info
4. Search Tour/User
5. Edit Contact info
6. See Tour info and Other user info
7. Save the tour you like
Plan to do
1. Booking and Booking history
2. Payment with credit card
3. Comment on tour and user
4. Vote up and down on tour and user

To run
1. npm install then add your facebook api key in src/util/util then npm start in front-end folder
2. Without docker, npm install in back-end folder change mongoUrl in db.ts then npm run build then npm start
3. With docker-compose build then docker-compose up in back-end folder
4. go to localhost:8080
