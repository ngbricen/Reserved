const router = require('express').Router();
const Joi = require('joi');
const validateRequest = require('../../middleware/validateRequest');
const postsController = require('../../controllers/postsController');
const auth = require('../../middleware/auth');

// Matches with "/api/users"
router.post('/', createSchema, create);
router.get('/', auth, getPublicRequests);
router.get('/:id', auth, getSingleUserPosts);
router.get('/post/:postId', auth, getSinglePost);
// router.put('/:id', auth, updateSchema, update);
router.delete('/post/:postId', auth, deletePost);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    text: Joi.string().min(1).required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  console.log('in creation');
  postsController
    .create(req.body)
    .then((post) => res.json(post))
    .catch(next);
}

function getPublicRequests(req, res, next) {
  postsController
    .findUsers()
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
}

function getSingleUserPosts(req, res, next) {
  postsController
    .findUsers(req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
}

function getSinglePost(req, res, next) {
  postsController
    .findPost(req.params.postId)
    .then((post) => {
      if (post.userId !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized User' });
      }
      res.json(post);
    })
    .catch(next);
}

function deletePost(req, res, next) {
  postsController
    .deletePost(req.params.postId,req.user.id)
    .then(() => res.json({ message: 'Account deleted successfully' }))
    .catch(next);
}
// function updateSchema(req, res, next) {
//   const schemaRules = {
//     name: Joi.string().empty(''),
//     email: Joi.string().email().empty(''),
//     password: Joi.string().min(6).empty(''),
//     confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
//   };

//   const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
//   validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//   // users can update their own account and admins can update any account
//   if (Number(req.params.id) !== req.user.id) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   usersController
//     .update(req.params.id, req.body)
//     .then((account) => res.json(account))
//     .catch(next);
// }

// function deleteUser(req, res, next) {
//   // users can delete their own account and admins can delete any account
//   if (Number(req.params.id) !== req.user.id) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   usersController
//     .deleteUser(req.params.id)
//     .then(() => res.json({ message: 'Account deleted successfully' }))
//     .catch(next);
// }
