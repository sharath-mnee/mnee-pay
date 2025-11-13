import {
  Wallet,
  Wrench,
  LogOut,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onNavigate: (route: string) => void;
  merchantToolsExpanded: boolean;
  onToggleMerchantTools: () => void;
}

const Sidebar = ({
  activeSection,
  setActiveSection,
  onNavigate,
  merchantToolsExpanded,
  onToggleMerchantTools,
}: SidebarProps) => (
  <div className="w-[277px] bg-[#FAFAFA] border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden">
    <div className="p-3">
      <div className="flex items-start">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-20 w-auto"
        />
        <span className="bg-amber-50 text-gray-600 text-xm px-2.5 py-1 rounded ml-2 mt-1">
          Beta
        </span>
      </div>
    </div>

    <nav className="flex-1 p-3">
      <button
        onClick={() => setActiveSection('wallet')}
        className={`w-full flex items-center gap-3 px-4 py-1 rounded-lg mb-2 transition-colors ${
          activeSection === 'wallet' ? 'bg-white border' : 'hover:bg-gray-50'
        }`}
      >
        <Wallet size={20} />
        <span>Wallet</span>
      </button>

      <button
        onClick={() => setActiveSection('transactions')}
        className={`w-full flex items-center gap-3 px-4 py-1 rounded-lg mb-2 transition-colors ${
          activeSection === 'transactions' ? 'bg-white border' : 'hover:bg-gray-50'
        }`}
      >
        <CreditCard size={20} />
        <span>Transactions</span>
      </button>

      <div>
        <button
          onClick={() => {
            onToggleMerchantTools();
          }}
          className={`w-full flex items-center gap-3 px-4 py-1 rounded-lg mb-2 transition-colors ${
            activeSection === "merchanttools"
              ? "bg-white border"
              : "hover:bg-gray-50"
          }`}
        >
          <Wrench size={20} />
          <span className="pr-12">Merchant tools</span>
          {merchantToolsExpanded ? (
            <ChevronDown size={16} className="text-gray-700" />
          ) : (
            <ChevronUp size={16} className="text-gray-700" />
          )}
        </button>

        {merchantToolsExpanded && (
          <div className="relative ml-6 mt-1">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
            {[
              { id: "merchant-getting-started", label: "Getting started" },
              { id: "merchant-api", label: "API documentation" },
              { id: "modules", label: "Modules" },
              { id: "merchant-examples", label: "Examples" },
              { id: "merchant-styles", label: "Styles & theming" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left pl-6 py-1 text-sm rounded-lg ${
                  activeSection === item.id
                    ? "bg-white border"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>

    <div className="p-3">
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
        <LogOut size={20} />
        <span>Sign out</span>
      </button>
      
      <div className="flex items-center gap-3 mt-3 px-2">
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