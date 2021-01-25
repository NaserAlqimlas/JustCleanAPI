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

Due to time constraints I wasn't able to meet all the requirements. This section clarifies how I would have done things differently/improved what I have already done. This section isn't here to make excuses, it's simply to clarify why some of the requirements weren't met.

- Add REDIS caching -- I wasn't able to complete this since I have no knowledge on the topic, and whilst I tried to implement it I couldn't due to the lack of time.
- Naming conventions in database tables. In the towers table i opted for camel case where as in the offices table i opted for snake case, while i did intend to come back to this later and fix it i just didn't have the time.
- Filtering on multiple query parameters -- I misunderstood the initial requirement and had filteration for a single parameter, i tried to fix this but due to time constraints i wasn't able to.
- Figure socket.io client connectivity issues. -- This one was a weird one because even if i followed the documentation to the tee the socket would refuse to connect. I even changed the code such that it is 100% identical to the docs and it didn't work. Coincidentally, when i made a completely new project and ran the code it somehow worked, but the socket wouldn't work in this project no matter what i tried.
- UnhandledPromiseRejectionWarning on update API. -- I didn't really have time to look at this one, once i got the API working i decided to quickly move on to sockets as I had only one day left at that point.
