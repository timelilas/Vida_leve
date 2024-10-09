// import * as jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// const generateToken = (payload: object) => {
//   const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '15y' });
//   return token;
// };

// const verifyToken = (token: string) => {
//   const decoded = jwt.verify(token, JWT_SECRET);
//   return decoded as jwt.JwtPayload;
// };

// export { generateToken, verifyToken };