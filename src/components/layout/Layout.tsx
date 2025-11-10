import Sidebar from './Sidebar';

interface LayoutProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  children: React.ReactNode;
}

const Layout = ({ activeSection, setActiveSection, children }: LayoutProps) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar 
      activeSection={activeSection} 
      setActiveSection={setActiveSection} 
    />
    
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
);

export default Layout;