import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import WalletPage from './pages/Wallet';
import Transactions from './pages/Transactions';
import Login from './components/auth/Login';
import Onboarding from './components/auth/Onboarding';
import MerchantToolsPage from './pages/MerchnatTools'
import GettingStarted from './components/merchant/tools/GettingStarted';

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
            {activeSection === 'merchanttools' && <MerchantToolsPage />}
            {activeSection === 'merchant-getting-started' && <GettingStarted />}
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;