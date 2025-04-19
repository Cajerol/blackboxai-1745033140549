const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load users from users.json
const usersFilePath = path.join(__dirname, 'users.json');
let users = [];

function loadUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error loading users:', err);
    users = [];
  }
}

loadUsers();

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Return user info without password
    const { password, ...userInfo } = user;
    return res.json({ success: true, user: userInfo });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
