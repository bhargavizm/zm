// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out successfully' });
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // Immediately expire
  });
  return res;
}
