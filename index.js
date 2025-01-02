const express = require('express');
const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
  const { username, password, dob, email } = req.body;
  //username validation

  if (username.includes(' ')) {
    const modifiedUsername = username.split(' ').join('');
    console.log(modifiedUsername, username);
    if (!validateUsername(modifiedUsername)) {
      return res.status(400).send('Invalid user format 1');
    }
  } else {
    console.log(username);
    if (!validateUsername(username)) {
      return res.status(400).send('Invalid user format 2');
    }
  }

  //email validation
  if (!email.includes('@gmail.com')) {
    return res.status(400).send('Invalid email format');
  }
  if (!validatePassword(password)) {
    return res.json(
      'Password should contain atleast one Upper, one smaller, one number and one special character'
    );
  }

  if (dob < 18) {
    return res.json('User must be 18 years or older..');
  }
  return res.send('User created successfully....');
});

app.listen(8080, () => {
  console.log('Service running on the http://localhost:8080');
});

function validateUsername(username) {
  let Caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let Small = 'abcdefghijklmnopqrstuvwxyz';
  let nums = '1234567890';
  let count = 0;
  for (let i = 0; i < username.length; i++) {
    if (
      Caps.includes(username[i]) ||
      Small.includes(username[i]) ||
      nums.includes(username[i])
    ) {
      count++;
    } else {
      return false;
    }
  }
  return true;
}

function validatePassword(password) {
  let Caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let Small = 'abcdefghijklmnopqrstuvwxyz';
  let specialChar = '!@#$%^&*()-_|+=;:><,.?/';
  let nums = '1234567890';
  let scount = 0;
  let acount = 0;
  let ncount = 0;
  let spcharCount = 0;

  if (password.length < 8) {
    return false;
  }

  for (let i = 0; i < password.length; i++) {
    if (Caps.includes(password[i])) {
      acount++;
    }
    if (Small.includes(password[i])) {
      scount++;
    }
    if (nums.includes(password[i])) {
      ncount++;
    }
    if (specialChar.includes(password[i])) {
      spcharCount++;
    }
  }
  if (acount < 1 || scount < 1 || ncount < 1 || spcharCount < 1) {
    return false;
  }

  return true;
}
