import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  children: React.ReactNode;
}

const Layout = ({ isSidebarOpen, setIsSidebarOpen, activeSection, setActiveSection, children }: LayoutProps) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar 
      isSidebarOpen={isSidebarOpen} 
      activeSection={activeSection} 
      setActiveSection={setActiveSection} 
    />
    
    <div className="flex-1 overflow-auto">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />
      {children}
    </div>
  </div>
);

export default Layout;