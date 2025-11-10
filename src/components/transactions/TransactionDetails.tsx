import { X, Copy } from 'lucide-react';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    date: string;
    type: string;
    moduleType: string;
    moduleName: string;
    amount: string;
    status: string;
    customerEmail?: string;
    sendHash?: string;
    currency?: string;
    amountUSD?: string;
    rwId?: string;
  } | null;
}

const TransactionDetailsModal = ({ isOpen, onClose, transaction }: TransactionDetailsModalProps) => {
  if (!isOpen || !transaction) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-900">Transaction details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-140px)]">
          <div className="flex items-center justify-between mb-8 border border-[#E5E5E5] p-3 rounded-[8px]">
            <span className="text-2xl font-semibold text-green-600">
              {transaction.amount}
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors">
                Receive
              </button>
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                Complete
              </button>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Transaction ID</label>
              <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
            </div>

            {transaction.customerEmail && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Customer email</label>
                <p className="text-sm text-gray-900">{transaction.customerEmail}</p>
              </div>
            )}

            {transaction.sendHash && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Send hash</label>
                <div className="flex items-start gap-2">
                  <p className="text-sm text-gray-900 break-all flex-1">{transaction.sendHash}</p>
                  <button 
                    onClick={() => copyToClipboard(transaction.sendHash!)}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600 mb-1">Created on</label>
              <p className="text-sm text-gray-900">{transaction.date}</p>
            </div>

            {transaction.currency && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Incoming currency</label>
                <p className="text-sm text-gray-900">{transaction.currency}</p>
              </div>
            )}

            {transaction.amountUSD && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Amount in USD</label>
                <p className="text-sm text-gray-900">{transaction.amountUSD}</p>
              </div>
            )}

            {transaction.rwId && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">RW ID</label>
                <p className="text-sm text-gray-900">{transaction.rwId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <button 
            onClick={onClose}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailsModal;