import { useState } from 'react';
import Layout from './components/layout/Layout';
import WalletPage from './pages/Wallet';
import Transactions from './pages/Transactions';

const App = () => {
  const [activeSection, setActiveSection] = useState('wallet');

  return (
    <Layout 
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      >
        {activeSection === 'wallet' && <WalletPage />}
        {activeSection === 'transactions' && <Transactions />}
    </Layout>
  );
};

export default App;