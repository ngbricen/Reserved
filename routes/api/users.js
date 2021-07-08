const router = require("express").Router();
const Joi = require('joi');
const validateRequest = require('../../middleware/validateRequest');
const usersController = require("../../controllers/usersController");
const auth = require('../../middleware/auth');

// Matches with "/api/users"
router.post('/', registerSchema, register);
router.post('/', auth, createSchema, create);
router.put('/:id', auth, updateSchema, update);
router.delete('/:id', auth, deleteUser);

module.exports = router;

function registerSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  usersController
    .register(req.body, req.get('origin'))
    .then(() =>
      res.json({
        message:
          'Registration successful, please check your email for verification instructions',
      })
    )
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  usersController
    .create(req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    name: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
    password: Joi.string().min(6).empty(''),
    confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
  };

  const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  // users can update their own account and admins can update any account
  if (Number(req.params.id) !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  usersController
    .update(req.params.id, req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function deleteUser(req, res, next) {
  // users can delete their own account and admins can delete any account
  if (Number(req.params.id) !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  usersController
    .deleteUser(req.params.id)
    .then(() => res.json({ message: 'Account deleted successfully' }))
    .catch(next);
}