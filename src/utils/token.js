import jwt from 'jsonwebtoken';

export default function generateToken({ _id, email }) {
    const token = jwt.sign(
        { _id, email },
        process.env.JWT_SECRET || 'zmqr123',
        { expiresIn: '1d' }
    );

    return token;
}
