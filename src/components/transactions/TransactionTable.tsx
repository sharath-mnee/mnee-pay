import { Download } from 'lucide-react';
import TransactionRow from './TransactionRow';
import Pagination from './Pagination';
import TransactionDetailsModal from './TransactionDetails'
import { useState } from 'react';

interface TransactionTableProps {
  transactions: Array<{
    id: string;
    date: string;
    type: string;
    moduleType: string;
    moduleName: string;
    amount: string;
    status: string;
  }>;
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Complete': return 'bg-green-600';
      case 'Pending': return 'bg-amber-500';
      case 'Failed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };
    const getTypeColor = (type: string) => {
    switch(type) {
      case 'Send': return 'bg-gray-100 text-gray-800';
      case 'Receive': return 'bg-amber-500 text-white';
      default: return 'bg-gray-600';
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                  <tr>
                      <th className="px-4 py-4 text-center text-xs font-bold text-gray-800">Transaction ID</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-800">Date ⇅</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-800">Type</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-800">Module type</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-800">Module name</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-800">Amount ⇅</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-800">Status</th>
                  </tr>
              </thead>

            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx, index) => (
                <TransactionRow 
                  key={index} 
                  tx={tx} 
                  getStatusColor={getStatusColor} 
                  getTypeColor={getTypeColor}
                  onClick={() => {
                      setSelectedTransaction(tx);
                      setIsModalOpen(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>

      <TransactionDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionTable;