import { RefreshCw } from 'lucide-react';

const BalanceCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-600">Total MNEE balance</span>
      <button className="text-gray-400 hover:text-gray-600">
        <RefreshCw size={20} />
      </button>
    </div>
    <div className="text-4xl font-bold mb-2">$24,567 MNEE</div>
    <div className="text-sm text-gray-600">
      MNEE price: <span className="font-medium">$1.10</span> | Amount: <span className="font-medium">24,567 MNEE</span>
    </div>
  </div>
);

export default BalanceCard;