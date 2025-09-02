// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongoClient';
import User from '@/models/auth/userSchema';
import { connectDB } from '@/lib/mongoDB';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
const handler = NextAuth({
    // adapter: MongoDBAdapter(clientPromise),

    session: {
        strategy: 'jwt',
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error('No user found');

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error('Incorrect password');

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            if (token?.user) session.user = token.user;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return '/'; // redirect to homepage after login
        },
    },

    // ✅ This is the important part: store OAuth users in your custom User model
    events: {
        async signIn({ user, account, profile, isNewUser }) {


            if (account.provider === 'google' || account.provider === 'facebook') {
                await connectDB();
                console.log('Connected to DB');

                const existing = await User.findOne({ email: user.email });


                if (!existing) {
                    const randomPassword = crypto.randomBytes(16).toString('hex'); // user-specific
                    const hashedPassword = await bcrypt.hash(randomPassword, 10);
                    const created = await User.create({
                        name: user.name ?? profile?.name ?? 'Unknown',
                        email: user.email,
                        phone: 'N/A',
                        password: hashedPassword,
                    });
                    console.log('Created new custom user:', created);
                } else {
                    console.log('User already exists — skipping creation');
                }
            }

        },
    },

    pages: {
        signIn: '/login', // custom login page
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
