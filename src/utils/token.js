import jwt from 'jsonwebtoken';

const token = jwt.sign(
    { _id, email,},
    process.env.JWT_SECRET || 'zmqr123',
    { expiresIn: '7d' }
);

module.exports = token;