import { useState } from 'react';
import Layout from './components/layout/Layout';
import WalletPage from './pages/Wallet';

const App = () => {
  const [activeSection, setActiveSection] = useState('wallet');

  return (
    <Layout 
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      >
        {activeSection === 'wallet' && <WalletPage />}
    </Layout>
  );
};

export default App;