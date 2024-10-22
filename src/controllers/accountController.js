const Account = require('../models/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra nếu tài khoản đã tồn tại
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ status: false, message: 'Username already exists!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const account = new Account({ username, password: hashedPassword });
    await account.save();

    res.status(201).json({ status: true, message: 'Account created successfully!', data: account });
    console.log('Account created successfully! ', account.username)
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username });
    if (!account) return res.status(404).json({ status: false, message: 'Account not found!' });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(401).json({ status: false, message: 'Invalid credentials!' });

    // Tạo JWT
    const token = jwt.sign({ id: account._id, username: account.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ status: true, message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getLoginPage = (req, res) => {
  res.render('login');  // Render trang login.ejs
};

exports.getRegisterPage = (req, res) => {
  try {
    console.log('Rendering register page...');
    res.render('register');  // Render file register.ejs
  } catch (error) {
    console.error('Error rendering register page:', error);
    res.status(500).send('Internal Server Error');
  }
};

