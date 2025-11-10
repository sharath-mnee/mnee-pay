interface TransactionRowProps {
  tx: {
    id: string;
    date: string;
    type: string;
    moduleType: string;
    moduleName: string;
    amount: string;
    status: string;
  };
  getStatusColor: (status: string) => string;
}

const TransactionRow = ({ tx, getStatusColor }: TransactionRowProps) => (
    <tr className="align-middle">
        <td className="px-4 py-2 text-sm font-medium underline cursor-pointer text-left">
            {tx.id}
        </td>

        <td className="px-4 py-2 text-sm text-gray-600 text-left">
            {tx.date}
        </td>

        <td className="px-4 py-2 text-center">
            <span className="inline-flex items-center justify-center w-24 h-8 bg-amber-500 text-white text-sm rounded-[10px] leading-none">
            {tx.type}
            </span>
        </td>

        <td className="px-4 py-2 text-sm text-gray-700">
            {tx.moduleType}
        </td>

        <td className="px-4 py-2 text-sm text-gray-700">
            {tx.moduleName}
        </td>

        <td
            className={`px-4 py-2 text-sm font-medium ${
            tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'
            }`}
        >
            {tx.amount}
        </td>

        <td className="px-4 py-2 text-center">
            <span
            className={`inline-flex items-center justify-center w-24 h-8 text-white text-sm rounded-[10px] leading-none ${getStatusColor(
                tx.status
            )}`}
            >
            {tx.status}
            </span>
        </td>
    </tr>
);

export default TransactionRow;
