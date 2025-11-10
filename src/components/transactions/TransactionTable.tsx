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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                  <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Transaction ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Date ⇅</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Module type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Module name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Amount ⇅</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Status</th>
                  </tr>
              </thead>

            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx, index) => (
                <TransactionRow 
                  key={index} 
                  tx={tx} 
                  getStatusColor={getStatusColor} 
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