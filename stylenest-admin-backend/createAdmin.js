require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await Admin.create({
    email: 'admin@gmail.com',
    password: 'style123'
  });

  console.log('Admin created successfully');
  process.exit();
})();
