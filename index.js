const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())

mongoose.connect(process.env.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Create a new user with the submitted data
    const user = new User({
      name,
      email,
      phone,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
