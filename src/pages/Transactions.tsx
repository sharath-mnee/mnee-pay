import TransactionTable from '../components/transactions/TransactionTable';
import { transactions } from '../data/MockData';
import { CreditCard } from "lucide-react"

const Transactions = () => (
  <div className="p-7 bg-white h-screen">
    <div className="flex items-center pt-3 pb-12">
      <CreditCard size={20} className="text-gray-800" />
      <div className="h-4 w-px bg-gray-300 mx-4" />
      <h1 className="text-xm font-normal font-sans text-gray-900">
        Transactions
      </h1>
    </div>
    <TransactionTable transactions={transactions} />
  </div>
);

export default Transactions;