import { Wallet, RefreshCw, LogOut, Menu } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar = ({ isSidebarOpen, activeSection, setActiveSection }: SidebarProps) => (
  <div className={`${isSidebarOpen ? 'w-70' : 'w-0'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}>
    <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
            <img
            src="/logo.svg"
            alt="Logo"
            className="h-20 w-auto"
            />
            <span className="bg-amber-50 text-gray-600 text-xs px-2.5 py-1 rounded">
            Beta
            </span>
        </div>
    </div>

    <nav className="flex-1 p-4">
      <button
        onClick={() => setActiveSection('wallet')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
          activeSection === 'wallet' ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}
      >
        <Wallet size={20} />
        <span>Wallet</span>
      </button>

      <button
        onClick={() => setActiveSection('transactions')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
          activeSection === 'transactions' ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}
      >
        <RefreshCw size={20} />
        <span>Transactions</span>
      </button>

      <button
        onClick={() => setActiveSection('merchant')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          activeSection === 'merchant' ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}
      >
        <Menu size={20} />
        <span>Merchant tools</span>
      </button>
    </nav>

    <div className="p-4 border-t border-gray-200">
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
        <LogOut size={20} />
        <span>Sign out</span>
      </button>
      
      <div className="flex items-center gap-3 mt-4 px-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">Sharath kariyappa</div>
          <div className="text-xs text-gray-500 truncate">skariyappa@mnee.io</div>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;