import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import APYBanner from '../components/wallet/APYBanner';
import BalanceCard from '../components/wallet/BalanceCard';
import ActionButtons from '../components/wallet/ActionButtons';
import { Wallet, X, CircleCheckBig, Database } from 'lucide-react';

const WalletPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowPopup = location.state?.showBetaPopup;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (shouldShowPopup) {
      setShowPopup(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [shouldShowPopup, navigate, location.pathname]);

  return (
    <div className="p-7 bg-white h-screen relative">

      <div className="flex items-center pt-3 pb-12">
        <Wallet size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300 mx-4" />
        <h1 className="text-xm font-normal font-sans text-gray-900">
          Wallet
        </h1>
      </div>

      <APYBanner />
      <BalanceCard />
      <ActionButtons />

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to the MNEE Pay beta
              </h2>
              <p className="text-sm text-gray-600">
                Your account is being set up and will be ready shortly. You're now part of an exclusive group of merchants revolutionizing payments.
              </p>
            </div>

            <div className="rounded-lg p-5 mb-6 hover:shadow-sm transition-shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Database size={30} strokeWidth={1.5} />
                <h3 className="font-semibold text-gray-900">
                  Support crypto-paying customers
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tap into the growing market of customers who prefer to pay with cryptocurrency.
              </p>
            </div>

            <div className="space-y-3 pb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig size={20} color="green" /> Instant settlement in your preferred currency
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig size={20} color="green" /> Lower transaction fees
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CircleCheckBig size={20} color="green" /> 24/7 customer support
              </div>
            </div>

            {/* <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2 rounded-lg font-medium text-white bg-[#D97706] hover:bg-orange-400 transition-colors"
            >
              Enter the beta
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
