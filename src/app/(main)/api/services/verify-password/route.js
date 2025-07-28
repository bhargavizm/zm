// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   const { enteredPassword, storedHash } = await req.json();

//   if (!storedHash) {
//     // no password required
//     return NextResponse.json({ success: true });
//   }

//   const match = await bcrypt.compare(enteredPassword, storedHash);

//   return NextResponse.json({ success: match });
// }
