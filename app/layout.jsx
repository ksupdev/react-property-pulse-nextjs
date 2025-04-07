import Navbar from '@/components/Navbar';
import "@/assets/styles/global.css";
import AuthProvider from '@/components/AuthProvider';
import Footer from "@/components/Footer";

export const metadata = {
  title: "PropertyPulse",
  description: "Find The Perfect Rental Property",
  keywords: "rental, property, real estate",
};

//sfc
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
