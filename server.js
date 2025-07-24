const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const accounts = JSON.parse(fs.readFileSync('./accounts.json'));


app.post('/login', (req, res) => {
  const { userinput, passinput } = req.body;

  const user = accounts.find(acc => acc.email === userinput && acc.password === passinput);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  const existingUser = accounts.find(acc => acc.email === email);
  if (existingUser) {
    return res.json({ success: false, message: "User already exists!" });
  }

  const newUser = {
    id: (accounts.length + 1).toString(),
    email,
    password
  };
  accounts.push(newUser);

  fs.writeFileSync('./accounts.json', JSON.stringify(accounts, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
