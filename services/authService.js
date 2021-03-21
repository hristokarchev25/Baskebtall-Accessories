const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
const User = require('../models/User');


const register = async ({ username, password }) => {
    //if username exist
    const user = new User({ username, password });
    return await user.save();
};


module.exports = {
    register,
}