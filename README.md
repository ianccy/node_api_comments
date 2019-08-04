# node_api_comments
It's RESTful API for sample comment board.

## mongodb
you need create your mongodb to store deta.

## npm install
install node_modules

## creare your env for local running
```
PROD_MONGODB : "mongodb://dbuser:dbpassword@ds131323.mlab.com:xxxxx/xxxxxxx"
```

## start server
http://localhost:3000

## start server
npm start

### Get API
GET http://localhost:3000/comments

### Post API
POST http://localhost:3000/comments
{ 
  name:xxx , 
  time: yyyy/mm/dd-hour:min:sec, 
  content: xxx
}

### Delete API
DELETE http://localhost:3000/comments/:id

### Update API
PUT http://localhost:3000/comments/:id
{ 
  name:xxx or 
  time: yyyy/mm/dd-hour:min:sec or 
  content: xxx 
}

### Deploy to Heroku
```
heroku login

git init
git add .
git commit -m "init node"

// create heroku repo
heroku create

// push remote
git push heroku master

heroku ps:scale web=1

heroku open

```
