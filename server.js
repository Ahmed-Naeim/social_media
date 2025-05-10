const express = require('express');
const connectDB = require('./config/_db.js');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
connectDB();


app.use(express.json());

app.use('/api',userRouter);
app.use('/api',authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

