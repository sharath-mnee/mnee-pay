import { RefreshCw, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const ActionButtons = () => (
  <div className="grid grid-cols-5 gap-3">
    <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
      <span>−</span>
      <span>Sell</span>
    </button>
    <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
      <RefreshCw size={16} />
      <span>Swap</span>
    </button>
    <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
      <span>+</span>
      <span>Buy</span>
    </button>
    <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
      <ArrowUpRight size={16} />
      <span>Send</span>
    </button>
    <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
      <ArrowDownLeft size={16} />
      <span>Receive</span>
    </button>
  </div>
);

export default ActionButtons;