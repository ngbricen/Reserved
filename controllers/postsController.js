const models = require('../models/index');
const dbUser = models.User;
const dbPost = models.Post;
const sendEmail = require('../config/sendEmail');

// Defining methods for the usersController
module.exports = {
  findPost: async function (postId) {
    const post = await dbPost.findByPk(postId);
    console.log(post);
    return post;
  },
  findUsers: async function (id = null) {
    const posts = await dbPost.findAll({
      where: { userId: id },
      order: [['createdDate', 'DESC']],
    });
    // models.sequelize
    // .query('CALL GET_USERS();')
    //.then((posts) => {
    //  console.log(posts);
    // res.json(posts);
    return posts;
    // })
    // .catch((err) => res.status(422).json(err.message));
  },
  create: async function (params) {
    console.log(params);
    const user = await dbUser.findOne({ where: { email: params.email } });
    // if (user) {
    // }

    //TODO: Update to ensure that authenticated users are accounted for
    const newPost = new dbPost({
      text: params.text,
      email: params.email,
      userId: user && user.id,
      name: user && user.name,
      avatar: user && user.avatar,
    });

    // save Post
    await newPost.save();

   await sendEmail({
     from: newPost.name, 
     to: newPost.email,
     subject: 'IT Reserved Request',
     html: `<h4>New Request</h4>
               ${newPost.text}`,
   });

    return newPost;
  },
  update: async function (id, params) {
    const user = await getUser(id);

    // validate (if email was changed)
    if (
      params.email &&
      user.email !== params.email &&
      (await dbUser.findOne({ where: { email: params.email } }))
    ) {
      throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
      params.passwordHash = await hash(params.password);
    }

    // copy params to user and save
    Object.assign(user, params);
    user.updated = Date.now();
    await user.save();

    return basicDetails(user);
  },
  deletePost: async function (postId, userId) {
    const post = await dbPost.findByPk(postId);

    if (post && post.userId === userId) {
      await post.destroy();
    } else {
      throw 'This post does not exist or cannot be deleted';
    }
  },
};

function basicDetails(post) {
  const {
    id,
    userId,
    name,
    text,
    email,
    avatar,
    isPublic,
    isActive,
    createdDate,
    updatedDate,
  } = user;
  return {
    id,
    userId,
    name,
    text,
    email,
    avatar,
    isPublic,
    isActive,
    createdDate,
    updatedDate,
  };
}
