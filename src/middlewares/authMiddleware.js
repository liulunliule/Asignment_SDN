// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ status: false, message: 'No token provided!' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ status: false, message: 'Failed to authenticate token.' });
//     req.userId = decoded.id;
//     next();
//   });
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ status: false, message: 'Authorization header is missing!' });
  }

  // Kiểm tra xem token có bắt đầu bằng "Bearer" không
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: false, message: 'Token is missing!' });
  }

  // Xác thực token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: false, message: 'Failed to authenticate token.' });
    }

    // Token hợp lệ, tiếp tục xử lý
    req.userId = decoded.id; // lưu thông tin người dùng vào request nếu cần
    next();
  });
};

module.exports = authMiddleware;
