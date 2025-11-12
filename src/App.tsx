import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import WalletPage from './pages/Wallet';
import Transactions from './pages/Transactions';
import Login from './components/auth/Login';
import Onboarding from './components/auth/Onboarding';
import Signup from './components/auth/Signup';
import MerchantToolsPage from './pages/MerchnatTools'

const App = () => {
  const [activeSection, setActiveSection] = useState('wallet');

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <Layout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          >
            {activeSection === 'wallet' && <WalletPage />}
            {activeSection === 'transactions' && <Transactions />}
            {activeSection === 'merchanttools' && <MerchantToolsPage />}
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;