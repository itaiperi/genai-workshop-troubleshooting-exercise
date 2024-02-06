const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3001;

app.set('view engine', 'ejs');

app.use(cookieParser());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const moviesData = [
  { id: 1, title: 'Inception', imageUrl: 'inception.jpg' },
  { id: 2, title: 'The Shawshank Redemption', imageUrl: 'shawshank.jpg' },
  { id: 3, title: 'The Godfather', imageUrl: 'godfather.jpg' },
  // Add more movie data as needed
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulate authentication logic
  if (username === 'user' && password === 'password') {
    res.cookie('loginCookie', 'my-secure-login-cookie');
    res.redirect('/movies');
  } else {
    res.send('Login failed. Please check your credentials.');
  }
});

app.get('/movies', (req, res) => {
  if (req.cookies.loginCookie === 'my-secrue-login-cookie') {
    // Simulate user's liked movies data
    const likedMovies = [moviesData[0], moviesData[1]]; // User likes Inception and The Shawshank Redemption

    // Intentional bugs in template rendering
    res.render('movies', { movies: likedMovies });
  } else {
    res.redirect('/');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
