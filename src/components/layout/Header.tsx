import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => (
  <div className="p-4 bg-white border-b border-gray-200 lg:hidden">
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="p-2 hover:bg-gray-100 rounded-lg"
    >
      {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>
);

export default Header;