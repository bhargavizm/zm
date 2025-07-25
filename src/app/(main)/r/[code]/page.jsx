// app/r/[code]/page.jsx
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongoDB";
import ShortLink from "@/models/shortLinkSchema";

export default async function RedirectPage({ params }) {
  await connectDB();
  const record = await ShortLink.findOne({ code: params.code });

  if (record) {
    redirect(record.fullUrl);
  } else {
    redirect("/not-found");
  }
}
