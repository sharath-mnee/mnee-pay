import { useState } from 'react';
import { ArrowRightLeft, ArrowUpRight, ArrowDownLeft, X, Plus, Minus } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Utils } from '@bsv/sdk';

export const validateAddress = (address: string) => {
  try {
    const decoded = Utils.fromBase58Check(address);

    // Only accept mainnet P2PKH addresses (starting with '1')
    const validPrefixes = [0x00];
    const prefixByte = decoded.prefix[0];

    if (typeof prefixByte !== 'number' || !validPrefixes.includes(prefixByte)) {
      throw new Error(`Invalid address prefix: ${prefixByte}`);
    }
    if (decoded.data.length !== 20) {
      throw new Error(`Invalid address payload length: ${decoded.data.length}`);
    }
    return true;
  } catch (error) {
    return false;
  }
};


const ActionButtons = () => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [amountError, setAmountError] = useState('');
  const [sendToError, setSendToError] = useState('');

  const walletAddress = '18kMmJ4F6uYPYuQ7o2C2GfsVKWu5fE9ska';

  // Validation functions
  const validateAmount = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setAmountError('Amount must be a number');
    } else {
      setAmountError('');
    }
    setAmount(value);
  };

  const handleSendToChange = (value: string) => {
    setSendTo(value);
    if (value) {
        if (!validateAddress(value)) {
        setSendToError('Invalid Bitcoin address');
        } else {
        setSendToError('');
        }
    } else {
        setSendToError('');
    }
  };

  const handleSend = () => {
    if (!amount || amountError || !sendTo || sendToError) return;
    alert(`Sending ${amount} to ${sendTo}`);
    setShowSendModal(false);
    setAmount('');
    setSendTo('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Minus size={16} />
          <span>Sell</span>
        </button>
        <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <ArrowRightLeft size={16} />
          <span>Swap</span>
        </button>
        <button className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Plus size={16} />
          <span>Buy</span>
        </button>
        <button
          className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          onClick={() => setShowSendModal(true)}
        >
          <ArrowUpRight size={16} />
          <span>Send</span>
        </button>
        <button
          className="bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          onClick={() => setShowReceiveModal(true)}
        >
          <ArrowDownLeft size={16} />
          <span>Receive</span>
        </button>
      </div>

      {showReceiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[400px] p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Receive MNEE</h2>
              <button onClick={() => setShowReceiveModal(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">Wallet Address</p>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mb-4">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="flex-1 text-sm outline-none"
              />
              <button
                className="ml-2 text-sm text-gray-700 hover:text-gray-900"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>

            <div className="flex justify-center">
              <QRCodeCanvas value={walletAddress} size={180} />
            </div>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[400px] p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Send MNEE</h2>
              <button onClick={() => setShowSendModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount in USD
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => validateAmount(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                placeholder="Enter amount"
              />
              {amountError && <p className="text-xs text-red-500 mt-1">{amountError}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Send To
              </label>
              <input
                type="text"
                value={sendTo}
                onChange={(e) => handleSendToChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                placeholder="Enter Bitcoin address"
              />
              {sendToError && <p className="text-xs text-red-500 mt-1">{sendToError}</p>}
            </div>
            <button
              onClick={handleSend}
              className="w-full bg-[#D97706] text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;