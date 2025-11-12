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
  <div className="relative border rounded-lg overflow-hidden mb-4">
    <pre className="bg-gray-100 p-4 overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
    <CopyButton code={code} />
  </div>
);

const GettingStarted: React.FC = () => {
  return (
    <div className="p-8 overflow-y-auto max-w-4xl text-gray-800">
      <div className="flex items-center gap-2 mb-12">
        <Wrench size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300" />
        <h1 className="text-xl font-normal text-gray-900">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-800" />
        <h1 className="text-xl font-normal text-gray-900">Getting started</h1>
      </div>

      <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
      <p className="text-gray-600 mb-8">
        Add professional crypto payments to your React application in minutes.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Installation</h2>
        <p className="mb-3">Install the package using your favorite package manager:</p>

        <div className="space-y-4">
          <div>
            <p className="font-medium mb-1">npm</p>
            <CodeBlock code="npm install @mnee/checkout" />
          </div>
          <div>
            <p className="font-medium mb-1">yarn</p>
            <CodeBlock code="yarn add @mnee/checkout" />
          </div>
          <div>
            <p className="font-medium mb-1">pnpm</p>
            <CodeBlock code="pnpm add @mnee/checkout" />
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
