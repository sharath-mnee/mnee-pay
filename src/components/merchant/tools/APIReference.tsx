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

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => {
  return (
    <div className="relative border border-gray-700 rounded-lg overflow-hidden mb-4">
      <pre className="bg-black p-4 overflow-x-auto text-sm text-white">
        <code>{code}</code>
      </pre>
      <CopyButton code={code} />
    </div>
  );
};

const APIReference: React.FC = () => {
  return (
    <div className="px-7 py-7 overflow-y-auto w-full text-gray-800">
      <div className="flex items-center pt-3 pb-12">
        <Wrench size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300 mx-4" />
        <h1 className="text-xl font-normal text-gray-500">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-700" />
        <h1 className="text-xl font-normal text-gray-700">API documentation</h1>
      </div>

      <h1 className="text-3xl font-bold mb-4">API Reference</h1>
      <p className="text-gray-600 mb-8">
        Complete reference for all props and configurations.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Core Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Required</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">checkoutType</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">'paywall' | 'ecommerce' | 'donation'</code></td>
                <td className="border border-gray-300 px-4 py-2">Yes</td>
                <td className="border border-gray-300 px-4 py-2">Type of checkout experience</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">payment</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">PaymentDetails</code></td>
                <td className="border border-gray-300 px-4 py-2">Yes</td>
                <td className="border border-gray-300 px-4 py-2">Payment configuration object</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">theme</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">'light' | 'dark' | 'auto'</code></td>
                <td className="border border-gray-300 px-4 py-2">No</td>
                <td className="border border-gray-300 px-4 py-2">Theme mode (default: 'light')</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">styling</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">StyleConfig</code></td>
                <td className="border border-gray-300 px-4 py-2">No</td>
                <td className="border border-gray-300 px-4 py-2">Custom styling options</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">metadata</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">CheckoutMetadata</code></td>
                <td className="border border-gray-300 px-4 py-2">No</td>
                <td className="border border-gray-300 px-4 py-2">Custom data to link payments to your products (returned in PaymentResult)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">PaymentDetails</h2>
        <CodeBlock code={`interface PaymentDetails {
  amount: string | number;
  currency: Stablecoin; // 'USDC' | 'USDT' | 'DAI' | etc.
  mneeDepositAddress: string; // Recipient wallet address
  networkId?: number;
  tokenAddress?: string;
}`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Button Configuration</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">buttonConfig</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">ButtonConfig</code></td>
                <td className="border border-gray-300 px-4 py-2">Customize the checkout button</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">triggerMode</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">'button' | 'manual'</code></td>
                <td className="border border-gray-300 px-4 py-2">How to trigger the modal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">open</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Controlled modal state</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onOpenChange</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(open: boolean) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Modal state change handler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Callbacks</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Callback</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onSuccess</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(result: PaymentResult, formData?: Record&lt;string, any&gt;) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called on successful payment</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onCancel</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when checkout is cancelled</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onError</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(error: Error) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called on payment error</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onFieldChange</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(fieldId: string, value: any) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when a field value changes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onWalletConnect</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(address: string, provider: WalletProvider) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when wallet connects</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Custom Fields</h2>
        <p className="mb-3">Create dynamic forms with validation:</p>
        <CodeBlock code={`interface CustomField {
  id: string;
  type: 'text' | 'email' | 'number' | 'select' | 'radio' | 'checkbox' | 'textarea';
  label: string;
  placeholder?: string;
  defaultValue?: any;
  options?: FieldOption[];
  validation?: FieldValidation;
  dependsOn?: {
    fieldId: string;
    value: any;
  };
}`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Cart Components</h2>
        <p className="mb-4">For multi-item checkout experiences, use these cart components:</p>

        <h3 className="text-xl font-semibold mb-2">MneeProvider</h3>
        <p className="mb-3">Required wrapper for cart functionality. Provides cart context to all components.</p>
        <CodeBlock code={`import { MneeProvider } from '@mnee/checkout';

// Wrap your app or page with MneeProvider
<MneeProvider>
  <YourApp />
</MneeProvider>`} />

        <h3 className="text-xl font-semibold mb-2 mt-6">FloatingCartButton</h3>
        <p className="mb-3">Displays a floating cart icon with item count badge.</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onClick</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when button is clicked</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">position</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">'top-right' | 'top-left' | etc.</code></td>
                <td className="border border-gray-300 px-4 py-2">Position on screen</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-2 mt-6">CartView</h3>
        <p className="mb-3">Displays cart items with quantity controls and collects email/shipping info.</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onContinueShopping</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Close cart view</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onProceedToCheckout</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Open checkout modal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">collectEmail</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Show email form</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">collectShipping</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Show shipping form</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-2 mt-6">CartCheckoutModal</h3>
        <p className="mb-3">Handles payment for all cart items with wallet connection.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">open</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Modal open state</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onOpenChange</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(open: boolean) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">State change handler</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">payTo</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">string</code></td>
                <td className="border border-gray-300 px-4 py-2">Recipient wallet address</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded">onSuccess</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="bg-gray-100 px-1 rounded text-xs">(result, checkoutData) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Success callback with cart items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">E-commerce Config with Cart</h2>
        <p className="mb-3">Enable cart by setting <code className="bg-gray-100 px-1 rounded">enableCart: true</code> in ecommerceConfig:</p>
        <CodeBlock code={`ecommerceConfig={{
  productName: 'Premium T-Shirt',
  productDescription: 'High-quality cotton',
  productImage: '/product.jpg',
  showQuantitySelector: true,
  shippingCost: 5,
  taxRate: 0.08,
  enableCart: true, // Enables "Add to Cart" instead of direct checkout
}}`} />
      </section>
    </div>
  );
};

export default APIReference;