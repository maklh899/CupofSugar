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
  console.log(`SignIn req: ${req}`);
  try {
    const payload = req.body;
    console.log('userControl-signIn() payload:', payload);
    // const token = await signInUser(payload);
    const response = await signInUser(payload);
    //console.log(`SignIn response: ${response.user} and ${response.token}`);
    res.header('x-auth-token', response.token);
    res.status(200).json({
      success: true,
      user: response.user,
      token: response.token,
    });
    // console.log('token:', token);
  } catch (error) {
    console.log('signIn error: ', error.message);
    res.status(401).json({
      success: false,
      mess: error.message,
    });
  }
  console.log('SignIn done');
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
