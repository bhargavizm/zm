import jwt from 'jsonwebtoken';

export default function generateToken({ _id, email }) {
    const token = jwt.sign(
        { _id, email },
        process.env.JWT_TOKEN || 'zmqr123',
         //{ expiresIn: '2m' }
        { expiresIn: '1d' }
        //    { expiresIn: '1h' }
    );

    return token;
}
