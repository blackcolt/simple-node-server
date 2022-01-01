import express from 'express';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  { name: { type: String, required: true }, age: Number, email: String },
);
const User = mongoose.model('User_Visits', userSchema);

const app = express();
const port = 80;

try {
  mongoose.connect('mongodb://127.0.0.1:27017/stam', { useNewUrlParser: true }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info('connected to mongodb sucsessfully 👍');
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}

app.get('/users-sign', (req, res) => {
  User.create({ age: 30, email: 'a@foo.bar' }).then((user) => {
    user.save();
    res.send(`Hello ${user.name}!`);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.info(`Example app listening at http://0.0.0.0:${port}`);
}).on('error', (error) => {
  console.log(error.message);
  process.exit(1);
});
