const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();
const port = 8080;

// Fungsi untuk merender HTML
const renderHTML = (filePath, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.write('<h1>500 Internal Server Error</h1>');
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    }
  });
};


// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk menangani permintaan dan menggunakan if-else untuk merender HTML
app.use((req, res) => {
  const url = req.url;
  if (url === '/' || url === '/index.html') {
    renderHTML(path.join(__dirname, 'public', 'index.html'), res);
  } else if (url === '/about') {
    renderHTML(path.join(__dirname, 'public', 'about.html'), res);
  } else if (url === '/contact') {
    renderHTML(path.join(__dirname, 'public', 'contact.html'), res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

// Buat server HTTP dan gabungkan dengan Express
const server = http.createServer(app);

// Menjalankan server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
