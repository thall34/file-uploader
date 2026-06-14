const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./config/db');

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const folderRouter = require('./routes/folderRouter');
const fileRouter = require('./routes/fileRouter');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require("dotenv/config");
require('./config/passport');
app.use(session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  },  
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false,
  store: new PrismaSessionStore(
    prisma, 
    {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/folder', folderRouter);
app.use('/file', fileRouter);
app.get('/{*splat}', (req, res) => {
  res.status(404).render('errors', {
    title: 'Error 404 - Page Not Found',
    message: 'Error 404 - Page does not exist in the database',
  });
});
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  };

  console.log(`Members only app - listening on port ${PORT}`);
});