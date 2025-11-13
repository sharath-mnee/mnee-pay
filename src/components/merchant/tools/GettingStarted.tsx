import React from 'react';
import { Wrench, ChevronRight, Copy } from 'lucide-react';

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Copied to clipboard!');
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs"
    >
      <Copy size={14} /> Copy
    </button>
  );
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <div className="relative border border-gray-700 rounded-lg overflow-hidden mb-4">
    <pre className="bg-black text-white p-4 overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
    <CopyButton code={code} />
  </div>
);

const GettingStarted: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<'npm' | 'yarn' | 'pnpm'>('npm');

  const installCommands = {
    npm: 'npm install @mnee/checkout',
    yarn: 'yarn add @mnee/checkout',
    pnpm: 'pnpm add @mnee/checkout',
  };

  return (
    <div className="px-7 py-7 overflow-y-auto w-full text-gray-800">
      <div className="flex items-center pt-3 pb-12">
        <Wrench size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300 mx-4" />
        <h1 className="text-xl font-normal text-gray-500">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-700" />
        <h1 className="text-xl font-normal text-gray-700">Getting started</h1>
      </div>

      <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
      <p className="text-gray-600 mb-8">
        Add professional crypto payments to your React application in minutes.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Installation</h2>
        <p className="mb-3">Install the package using your favorite package manager:</p>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="flex w-full border-b border-gray-300">
            <button
              onClick={() => setSelectedTab('npm')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'npm'
                  ? 'bg-gray-200 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              npm
            </button>
            <button
              onClick={() => setSelectedTab('yarn')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors border-l border-r border-gray-300 ${
                selectedTab === 'yarn'
                  ? 'bg-gray-200 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              yarn
            </button>
            <button
              onClick={() => setSelectedTab('pnpm')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'pnpm'
                  ? 'bg-gray-200 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              pnpm
            </button>
          </div>
          <div className="relative">
            <pre className="bg-black text-white p-4 overflow-x-auto text-sm">
              <code>{installCommands[selectedTab]}</code>
            </pre>
            <CopyButton code={installCommands[selectedTab]} />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Peer Dependencies</h2>
        <p className="mb-3">Make sure you have React 18 or higher installed:</p>
        <CodeBlock code="npm install react@^18.2.0 react-dom@^18.2.0" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Import Styles</h2>
        <p className="mb-3">
          Import the CSS in your app's entry point (e.g., <code>main.tsx</code> or <code>App.tsx</code>):
        </p>
        <CodeBlock code="import '@mnee/checkout/styles.css';" />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Quick Start</h2>
        <p className="mb-3">Here's a minimal example to get you started with a paywall:</p>
        <span className="text-sm text-gray-600 mb-2 block">App.tsx</span>
        <CodeBlock code={`import { MneeCheckout } from '@mnee/checkout';

function App() {
  return (
    <MneeCheckout
      checkoutType="paywall"
      payment={{
        amount: 5,
        mneeDepositAddress: '1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC',
      }}
      paywallConfig={{
        title: 'Unlock Premium Content',
        description: 'Get lifetime access to this article',
      }}
      onSuccess={(result) => {
        console.log('Payment successful!', result);
      }}
    />
  );
}

export default App;`} />
      </section>
    </div>
  );
};

export default GettingStarted;
