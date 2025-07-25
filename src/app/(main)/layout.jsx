// app/(main)/layout.jsx
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
