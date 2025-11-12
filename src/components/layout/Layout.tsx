import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

const Layout = ({
  activeSection,
  setActiveSection,
  onNavigate,
  children,
}: LayoutProps) => {
  const [merchantToolsExpanded, setMerchantToolsExpanded] = useState(false);

  const handleToggleMerchantTools = () => {
    setMerchantToolsExpanded((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onNavigate={onNavigate}
        merchantToolsExpanded={merchantToolsExpanded}
        onToggleMerchantTools={handleToggleMerchantTools}
      />

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;