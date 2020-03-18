This is the backend for the community artists site. 

The languages used are Node.js and Express

The database used is Postgresql

It is put online using Heroku and the database is using Heroku Postgres

The biggest challenge was taking in FormData, and then figuring out the best way to get the image uploaded to the database. 
I first tried the byte64 and that seemed to complicated and slow of a process, but found out (after a lot of Googling) that I can use Cloudinary to turn my image into a link. It worked a lot faster and a lot easier to display the image on the front-end!


