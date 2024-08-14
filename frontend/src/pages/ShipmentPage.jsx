import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Shipment from "../components/user/checkout/Shipment";

const ShipmentPage = () => {
  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="mt-40">
          <Shipment />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default ShipmentPage;
