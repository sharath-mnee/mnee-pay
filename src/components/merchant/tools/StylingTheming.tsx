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

const CodeBlock: React.FC<{ code: string; filename?: string }> = ({ code, filename }) => (
  <div className="mb-4">
    {filename && (
      <span className="text-sm text-gray-600 mb-2 block">{filename}</span>
    )}
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      <pre className="bg-black text-white p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <CopyButton code={code} />
    </div>
  </div>
);

const StylingTheming: React.FC = () => {
  return (
    <div className="px-7 py-7 overflow-y-auto w-full text-gray-800">
      <div className="flex items-center pt-3 pb-12">
        <Wrench size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300 mx-4" />
        <h1 className="text-xm font-normal text-gray-500">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-700" />
        <h1 className="text-xm font-normal text-gray-700">Styling & Theming</h1>
      </div>

      <h1 className="text-lg font-bold mb-4">Styling & Theming</h1>
      <p className="text-gray-600 mb-8">
        Customize the appearance to match your brand.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Theme Support</h2>
        <p className="mb-3">Mnee Checkout supports light, dark, and auto themes:</p>
        <CodeBlock code={`// Light theme
<MneeCheckout theme="light" {...props} />

// Dark theme
<MneeCheckout theme="dark" {...props} />

// Auto (follows system preference)
<MneeCheckout theme="auto" {...props} />`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Custom Colors</h2>
        <p className="mb-3">Customize colors to match your brand:</p>
        <CodeBlock code={`<MneeCheckout
  checkoutType="paywall"
  styling={{
    primaryColor: '#8b5cf6',    // Primary brand color
    buttonColor: '#ec4899',     // Button background
    buttonTextColor: '#ffffff', // Button text
    accentColor: '#3b82f6',     // Accent highlights
    borderRadius: 'xl',         // sm | md | lg | xl | 2xl
  }}
  {...otherProps}
/>`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Button Customization</h2>
        <p className="mb-3">Customize the trigger button appearance:</p>
        <CodeBlock code={`<MneeCheckout
  buttonConfig={{
    text: 'Buy Now',           // Button text
    variant: 'default',        // default | outline | ghost
    size: 'lg',                // sm | md | lg
  }}
  {...otherProps}
/>`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">StyleConfig Interface</h2>
        <CodeBlock code={`interface StyleConfig {
  primaryColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  accentColor?: string;
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Complete Styling Example</h2>
        <CodeBlock 
          filename="BrandedCheckout.tsx"
          code={`import { MneeCheckout } from '@mnee/checkout';

function BrandedCheckout() {
  return (
    <MneeCheckout
      checkoutType="ecommerce"
      payment={{
        amount: 49.99,
        mneeDepositAddress: '1MC...',
      }}
      theme="dark"
      styling={{
        primaryColor: '#8b5cf6',
        buttonColor: '#8b5cf6',
        buttonTextColor: '#ffffff',
        accentColor: '#ec4899',
        borderRadius: 'xl',
      }}
      buttonConfig={{
        text: 'Purchase Now',
        variant: 'default',
        size: 'lg',
      }}
      ecommerceConfig={{
        productName: 'Premium Package',
        productImage: '/product.jpg',
      }}
      onSuccess={(result) => {
        console.log('Purchase complete!', result);
      }}
    />
  );
}`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Advanced: CSS Variables</h2>
        <p className="mb-3">For more control, you can override CSS variables directly:</p>
        <CodeBlock 
          filename="globals.css"
          code={`.mnee-checkout {
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}

.dark .mnee-checkout {
  --primary: 263.4 70% 50.4%;
  --border: 216 34% 17%;
}`} />
      </section>
    </div>
  );
};

export default StylingTheming;