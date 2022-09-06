const routesUser = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');

routesUser.get('/me', getUser);
routesUser.patch('/me', updateUser);

module.exports = routesUser;