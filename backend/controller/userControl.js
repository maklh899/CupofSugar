const { createUser, signInUser, getUsers } = require('../services/userService');

const signUp = async (req, res, next) => {
  try {
    const newUser = req.body;
    console.log(createUser);
    const savedUser = await createUser(newUser);
    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const payload = req.body;
    console.log('userControl-signIn() payload:', payload);
    const token = await signInUser(payload);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const findAll = async (req, res) => {
  try {
    const allUsers = await getUsers(res);
    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

const userControl = {
  signUp,
  signIn,
  findAll,
};

module.exports = userControl;
