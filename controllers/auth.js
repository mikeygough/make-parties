const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateJWT(user) {
  const mpJWT = jwt.sign({ id: user.id }, 'AUTH-SECRET', {
    expiresIn: 60 * 60 * 24 * 60,
  });

  return mpJWT;
}

module.exports = function (app, models) {
  // GET SIGNUP
  app.get('/sign-up', (req, res) => {
    res.render('sign-up');
  });

  // POST SIGNUP
  app.post('/sign-up', (req, res) => {
    models.User.create(req.body)
      .then(() => {
        const mpJWT = generateJWT(req.body);
        res.cookie('mpJWT', mpJWT);
        res.redirect('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // GET LOGIN
  app.get('/login', (req, res) => {
    res.render('login');
  });

  // POST LOGIN
  app.post('/login', async (req, res, next) => {
    try {
      // look up user with email
      const user = await models.User.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res.redirect('/login');
      }

      // compare passwords
      const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // if not match send back to login
      if (!isMatch) {
        return res.redirect('/login');
      }

      // if is match generate JWT
      const mpJWT = generateJWT(user);

      // save jwt as cookie
      res.cookie('mpJWT', mpJWT, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  });

  // GET LOGOUT
  app.get('/logout', (req, res, next) => {
    res.clearCookie('mpJWT');

    // req.session.sessionFlash = {
    //   type: 'success',
    //   message: 'Successfully logged out!',
    // };
    return res.redirect('/');
  });
};
