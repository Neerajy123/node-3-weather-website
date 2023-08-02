const { geoCode } = require('./utils/geoCode');
const { foreCast } = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPaths);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/* app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Neeraj',
      age: 27,
    },
    { name: 'Jim', age: 10 },
  ]);
});
app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
}); */

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Neeraj Yadav' });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Neeraj Yadav',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helptext: 'This is some helpful text',
    title: 'Help',
    name: 'Neeraj Yadav',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide the Address',
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      foreCast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
        // console.log(location);
        // console.log(forecastData);
      });
    }
  );

  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'Neemrana',
  //   address: req.query.address,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Neeraj Yadav',
    errorMessage: 'Help Article not found..',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Neeraj Yadav',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
