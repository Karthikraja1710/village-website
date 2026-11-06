import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { PrototypeNoticeBanner } from './components/PrototypeNoticeBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { PlaceholderSettingsModal } from './components/PlaceholderSettingsModal';
import { CouponsModal } from './components/CouponsModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { HerbsPantryPage } from './pages/HerbsPantryPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BrandsPage } from './pages/BrandsPage';

// Mobile bottom bar icons
import { Home, Store, Sparkles, User, ShoppingBag } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activePage, setActivePage, cartCount, setIsCartOpen, setIsAiAssistantOpen } = useStore();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'story':
        return <OurStoryPage />;
      case 'herbs':
        return <HerbsPantryPage />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'brands':
        return <BrandsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#243028]">
      {/* Top Prototype Disclaimers Bar */}
      <PrototypeNoticeBanner />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-0">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <AiAssistantModal />
      <PlaceholderSettingsModal />
      <CouponsModal />
      <ToastContainer />

      {/* Mobile Sticky Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-t border-[#e4dcce] px-4 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold cursor-pointer ${
            activePage === 'home' ? 'text-[#1c382b]' : 'text-[#8aa18e]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold cursor-pointer ${
            activePage === 'shop' ? 'text-[#1c382b]' : 'text-[#8aa18e]'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Shop</span>
        </button>

        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#bf563b] cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[#faeee9] flex items-center justify-center border border-[#f0cfc5]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>Advisor</span>
        </button>

        <button
          onClick={() => {
            setActivePage('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold cursor-pointer ${
            activePage === 'dashboard' ? 'text-[#1c382b]' : 'text-[#8aa18e]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[10px] font-semibold text-[#1c382b] cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Basket</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#bf563b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}

export default App;
