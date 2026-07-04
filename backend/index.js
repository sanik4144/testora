const express = require('express');
require('dotenv').config();
const app = express();
const con = require('./db/connection')
const cors = require('cors')

const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');

con();

app.use(cors({
    origin: "*",
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use('/check', (req, res)=>{
  res.send("Healthy");
})

con().then(() => {
  app.listen(process.env.PORT, (req, res)=>{
    console.log(`Running on port ${process.env.PORT}`);
  })
});
