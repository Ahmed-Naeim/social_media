const express = require('express');
const connectDB = require('./config/_db.js');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
connectDB();

const auth = require('./middleware/auth');


app.use(auth);
app.use(express.json());

app.use('/api',authRouter);
app.use('/api',userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

