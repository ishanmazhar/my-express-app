const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-student-2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("MongoDB Connection Failed!"));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/students', studentRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello from express js!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});

// username, password -> authentication
// JWT - JSON Web Token
// auth successful -> JWT -> local storage