import APYBanner from '../components/wallet/APYBanner';
import BalanceCard from '../components/wallet/BalanceCard';
import ActionButtons from '../components/wallet/ActionButtons';
import { Wallet } from 'lucide-react';

const WalletPage = () => (
  <div className="p-7 bg-white h-screen">
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
  </div>
);

export default WalletPage;
