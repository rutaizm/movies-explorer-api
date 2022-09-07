const routesUser = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const { validateUpdateUser } = require('../middlewares/validation');

routesUser.get('/me', getUser);
routesUser.patch('/me', validateUpdateUser, updateUser);

module.exports = routesUser;