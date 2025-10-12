import CallToAction from "@/components/CallToAction/CallToAction";
import ProductsPreview from "@/components/ProductsPreview/ProductsPreview";
import SignUp from "@/components/SignUp/SignUp";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <div id="main">
        <CallToAction />
        <ProductsPreview />
        <SignUp />
        <Footer />
      </div>
    </>
  );
}
