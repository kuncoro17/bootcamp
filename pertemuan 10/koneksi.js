// koneksi.js
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const validator = require('validator');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    user: "postgres",
    password: "penabur123",
    database: "contact",
    host: "localhost",
    port: 3000, // Port PostgreSQL default is 5432
});

const app = express();
const port = 8080;

// Middleware setup
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

module.exports = {
    app,
    port,
    pool
};
