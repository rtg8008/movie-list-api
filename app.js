const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const app = express();
const cors = require('cors');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH" )
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
  console.log('send hello world')
})


app.get("/movies", async (req, res) => {
  console.log('GET request at /movies endpoint')
  let result = await knex('movies')
    .select("*")
    .catch(err => console.log(err));
  res.status(200).json(result)
})

app.post("/movies", async (req, res) => {
  console.log('post request with data: ', req.body)

  if(req.body.title === undefined || req.body.iswatched === undefined)
  {
    res.status(400).json('not a valid request');
    return;
  }
  
  await knex('movies')
  .insert(req.body)
  .catch(err => console.log(err))

  let result = await knex('movies')
    .select("*")
    .catch(err => console.log(err));
  res.status(201).json(result);
})

app.delete('/movies/:id', async (req, res) => {
  console.log(`deleting movie at id: ${req.params.id}`);

  await knex('movies')
  .del()
  .where({id: req.params.id})

  let result = await knex('movies')
  .select("*");

  res.status(201).json(result);

})

app.patch(`/movies/:id`, async (req, res) => {
  console.log(`patching movie at id: ${req.params.id}, ${req.body}`)
  if (req.body.title === undefined && req.body.iswatched === undefined)
  {
    res.status(400).json('not a valid request');
    return;
  }
  await knex('movies')
  .update(req.body)
  .where({id: req.params.id})

  let result = await knex('movies')
  .select("*");

  res.status(201).json(result);

})


module.exports = app;