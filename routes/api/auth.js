const router = require('express').Router();
const Joi = require('joi');
const authController = require('../../controllers/authController');
const validateRequest = require('../../middleware/validateRequest');
const auth = require('../../middleware/auth');

router.post('/', loginSchema, loginUser);
router.get('/', auth, getUsers);
router.get('/:id', auth, getAuthenticatedUser);
router.post('/verify-email', verifyEmailSchema, verifyEmail);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', auth, revokeTokenSchema, revokeToken);

module.exports = router;

function loginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  validateRequest(req, next, schema);
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  
  authController
    .login({ email, password, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
}

function getAuthenticatedUser(req, res, next) {
  authController
    .authenticate(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
}

function getUsers(req, res, next) {
  authController
    .authenticate()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
}
// router.route('/:token').get(authController.verifyToken);

// router
//   .route('/dashboard')
//   .get(passport.authenticate('jwt', { session: false }), function (req, res) {
//     res.send('It worked! User id is: ' + req.user + '.');
//   });

// helper functions

function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 1 hour
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  };
  res.cookie('refreshToken', token, cookieOptions);
}

function verifyEmailSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function verifyEmail(req, res, next) {
  authController
    .verifyEmail(req.body)
    .then(() =>
      res.json({ message: 'Verification successful, you can now login' })
    )
    .catch(next);
}

function forgotPasswordSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
  authController
    .forgotPassword(req.body, req.get('origin'))
    .then(() =>
      res.json({
        message: 'Please check your email for password reset instructions',
      })
    )
    .catch(next);
}

function refreshToken(req, res, next) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  authController
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
}

function revokeTokenSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().empty(''),
  });
  validateRequest(req, next, schema);
}

function revokeToken(req, res, next) {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token) return res.status(400).json({ message: 'Token is required' });

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  authController
    .revokeToken({ token, ipAddress })
    .then(() => res.json({ message: 'Token revoked' }))
    .catch(next);
}