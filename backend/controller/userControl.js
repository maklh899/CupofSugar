const { createUser, signInUser, getUsers, findUserByUsername, updateUserDoc } = require('../services/userService');
const { addTenant } = require('../services/aptService');
// const { addTenantToApt } = require('../controller/aptControl');

const signUp = async (req, res, next) => {
  try {
    const newUser = req.body;
    // console.log('userControl-signUp() newUser:', newUser);

    const savedUser = await createUser(newUser);

    console.log('userControl-signUp() savedUser:', savedUser);
    const apt = await addTenant({ user: savedUser.userName, userId: savedUser['_id'], apt: newUser.aptId });

    console.log('userControl-signUp() apt: ', apt);
    // UPDATE APTID FOR USER DOCUMENT
    // const currUser = await findUserByUsername(req.body.user);
    // const userDoc = await updateUserDoc(currUser['_id'], { aptId: newApt.AptNumber });

    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      mess: error.message,
    });
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
