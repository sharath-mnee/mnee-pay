import { RefreshCw } from "lucide-react";
import { useState } from "react";

const BalanceCard = () => {
  const [balance] = useState<number | null>(200000);
  const [price] = useState<number>(1.1);


  const handleRefresh = () => {
    console.log("Refreshing balance...");
  };

  return (
    <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Total MNEE balance</span>
        <button
          onClick={handleRefresh}
          className="text-gray-400 hover:text-gray-600"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {balance ? (
        <>
          <div className="text-4xl font-bold mb-2">
            ${balance.toLocaleString()} MNEE
          </div>
          <div className="text-sm text-gray-600">
            MNEE price: <span className="font-medium">${price.toFixed(2)}</span> | Amount:{" "}
            <span className="font-medium">{balance.toLocaleString()} MNEE</span>
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-500 mt-4">
          Your MNEE balance will appear here once customers start making payments.
        </div>
      )}
    </div>
  );
};

export default BalanceCard;