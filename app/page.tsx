import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import CallToAction from "@/components/CallToAction/CallToAction";
import DashboardPreview from "@/components/DashboardPreview/DashboardPreview";
import SignUp from "@/components/SignUp/SignUp";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <div id="main">
        <CallToAction />
        <DashboardPreview />
        <SignUp />
        <Footer />
      </div>
    </>
  );
}
