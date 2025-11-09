import { useState } from 'react';
import Layout from './components/layout/Layout';

const App = () => {
  const [activeSection, setActiveSection] = useState('wallet');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Layout 
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      activeSection={activeSection}
      setActiveSection={setActiveSection} children={undefined}    >
    </Layout>
  );
};

export default App;