import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import WalletPage from './pages/Wallet';
import Transactions from './pages/Transactions';
import Login from './components/auth/Login';
import Onboarding from './components/auth/Onboarding';
import Modules from './components/merchant/tools/Modules'
import GettingStarted from './components/merchant/tools/GettingStarted';
import APIReference from './components/merchant/tools/APIReference';
import Examples from './components/merchant/tools/Examples';
import StylingTheming from './components/merchant/tools/StylingTheming';

const App = () => {
  const [activeSection, setActiveSection] = useState('wallet');

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Onboarding />} />

      <Route
        path="/dashboard"
        element={
          <Layout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onNavigate={(id: string) => setActiveSection(id)}
          >
            {activeSection === 'wallet' && <WalletPage />}
            {activeSection === 'transactions' && <Transactions />}
            {activeSection === 'modules' && <Modules />}
            {activeSection === 'merchant-getting-started' && <GettingStarted />}
            {activeSection === 'merchant-api' && <APIReference />}
            {activeSection === 'merchant-examples' && <Examples />}
            {activeSection === 'merchant-styles' && <StylingTheming />}
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;