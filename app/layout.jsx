import Navbar from '@/components/Navbar';
import "@/assets/styles/global.css";
import AuthProvider from '@/components/AuthProvider';
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: "PropertyPulse",
  description: "Find The Perfect Rental Property",
  keywords: "rental, property, real estate",
};

//sfc
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
