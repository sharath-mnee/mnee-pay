import APYBanner from '../components/wallet/APYBanner';
import BalanceCard from '../components/wallet/BalanceCard';
import ActionButtons from '../components/wallet/ActionButtons';
import { Wallet } from 'lucide-react';

const WalletPage = () => (
  <div className="p-8">
    <div className="flex items-center mb-6">
      <Wallet size={18} className="text-gray-800" />
      <div className="h-4 w-px bg-gray-300 mx-2" />
      <h1 className="text-sm font-normal font-sans text-gray-900">
        Wallet
      </h1>
    </div>

    <APYBanner />
    <BalanceCard />
    <ActionButtons />
  </div>
);

export default WalletPage;
