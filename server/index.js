var path = require('path');
var globSync = require('glob').sync;
var express = require('express');
var app = express();

var mocks = globSync('./mocks/**/*.js', {cwd: __dirname}).map(require);

const PATH_STYLES = path.resolve(__dirname, '../app/styles');
const PATH_IMAGES = path.resolve(__dirname, '../app/images');
const PATH_DIST = path.resolve(__dirname, '../dist');

app.use('/styles', express.static(PATH_STYLES));
app.use('/images', express.static(PATH_IMAGES));
app.use(express.static(PATH_DIST));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

app.get('/myPlan', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

app.get('/userDashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

app.get('/adminDashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

mocks.forEach(function (route) {
  route(app);
});

var server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});
