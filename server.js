require('dotenv').config();
const express = require('express');
const path = require('path');
const connection = require('./src/config/database');
const apiRoutes = require('./src/routes/api');

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'src', 'views'));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
apiRoutes(app);

(async () => {
  try {
    await connection();

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log('>>> Error connect to DB: ', error);
  }
})();
