const productsRoute = require('./productsRoute');
const categoriesRoute = require('./categoriesRoute');
const accountRoute = require('./accountRoute');
const homeRoute = require('./homeRoute');
const dashboardRoute = require('./dashboardRoute');

const initRoute = (app) => {
  app.use('/', homeRoute)
  app.use('/api', productsRoute);
  app.use('/api', categoriesRoute);
  app.use('/api', accountRoute);
  app.use('/api', dashboardRoute);  
};

module.exports = initRoute;
