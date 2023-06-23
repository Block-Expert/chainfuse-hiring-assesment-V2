var jwt = require('jsonwebtoken');
const UserService = require('../service/user');
require('dotenv').config();

const signUp = async (req, res) => {
  try {
    const payload = req.body;
    const walletAddress = payload?.walletAddress;

    if (walletAddress) {
      const oldPost = await UserService.getUserByWallet(walletAddress);
      if (oldPost) {
        return res.status(201).json({ msg: 'WalletAddress Already Exists' });
      }
    }

    const post = await UserService.addUser(req.body);
    if (post == null) {
      return res.status(500).json({ msg: 'Database Error' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
  return res.status(200).json({ msg: 'SignUp Success' });
};

const logIn = async (req, res) => {
  try {
    const payload = req.body;
    const post = await UserService.getUserBy(payload);

    if (post == null) {
      return res.status(404).json({ msg: 'User Does Not Exist' });
    }

    const jwtSecret = process.env.jwtSecret || '';

    jwt.sign(
      {
        user: post,
      },
      jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

const updateProfile = async (req, res) => {};

module.exports = {
  signUp,
  logIn,
  updateProfile,
};
