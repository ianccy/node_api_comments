const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.options('*', cors());


const { DB_URL } = require('./config.json');

const url = process.env.PROD_MONGODB || DB_URL;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/comments', (req, res) => {
  db.collection('comments').find().toArray((err, result) => {
    if (err) return res.sendStatus(500);
    res.send({data: result})
  })
})

app.post('/comments', (req, res) => {
    console.log(req.body);
    const { name, time, content } = req.body;
    if( !name || !time || !content ){
        res.sendStatus(403);
    }
    db.collection('comments').save(req.body, (err, result) => {
        if (err) return res.sendStatus(500);
        console.log('saved to database')
        res.send(req.body);
    });
})

app.delete('/comments/:id', (req, res) => {
    console.log(req.params.id);
    if(!req.params.id){
        res.sendStatus(403);
    }
    var obj = {_id: ObjectID(req.params.id)};
    db.collection("comments").remove(obj, function(err, obj) {
        if (err) {
            return res.sendStatus(500);
        }
        console.log("1 document deleted");
        res.send('delete success');
    });
})

app.put('/comments/:id', (req, res) => {
    console.log(req.params.id, req.body); 
    console.log(req.params.id);
    if(!req.body){
        res.sendStatus(403);
    }
    var newvalues = {$set: req.body};
    var obj = {_id: ObjectID(req.params.id)};
    db.collection("comments").updateOne(obj, newvalues, function(err, obj) {
        if (err) return res.sendStatus(500);
        console.log("1 document update");
        res.send('update success');
    });
})

const port = process.env.PORT || 3000;

console.log(port);

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('ian-test')
})

app.listen(port, () => {
    console.log('listening on 3000')
})