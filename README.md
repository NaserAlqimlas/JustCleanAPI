# JustCleanAPI

## Getting the environment set up

firstly, make sure node and postgres are installed. Next go into `config/config.js` and add your postgress username, password and database. do the same with `config/database.js`

Afterwards:

- run `npm install` to install all dependancies.
- run `sequelize-cli db:migrate` to create the tables.
- run `sequelize-cli db:seed:all` to populate the tables.

## Running the API

To run the api simply run `npm run dev` which will boot up the API. Navigate to localhost:5000/ to test.

to generate the jwt web token, run the `auth/login` API and copy and paste the web token into the headers of the Create, Update and Delete requests under Authorization such that it looks like this
`Bearer <jwt-auth-token>`

## Notes and issues
