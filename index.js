const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');//для того чтобы переходить по несуществующеу файлу, как маршрутизатор
const films = require('./routes/films.js');
const actors = require('./routes/actors.js');
const images = require('./routes/images/images.js');
const logs = require('./routes/logs/log.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//в единый формат, только выключен

app.use('/', routes);
app.use('/api/films', films);
app.use('/api/actors', actors);
app.use('/images/actors', images);
app.use('/api/log', logs.router);


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});