import React, { useEffect, useState } from 'react';
import { Wrench, ChevronRight, Copy } from 'lucide-react';

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Copied to clipboard!');
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 flex items-center gap-1 bg-gray-300 hover:bg-gray-300 text-gray-800 px-2 py-2 rounded text-xs transition-colors z-10"
    >
      <Copy size={15} />
    </button>
  );
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'typescript' }) => {
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      try {
        const shiki = await import('shiki');
        
        const highlighter = await shiki.createHighlighter({
          themes: ['dark-plus'],
          langs: ['typescript', 'tsx', 'javascript', 'jsx'],
        });

        const highlighted = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'dark-plus',
        });
        
        setHtml(highlighted);
      } catch (error) {
        console.error('Syntax highlighting error:', error);
        setHtml(`<pre class="bg-[#1e1e1e] text-white p-4"><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlight();
  }, [code, language]);

  return (
    <div className="relative border border-gray-700 rounded-lg overflow-hidden mb-4">
      {isLoading ? (
        <pre className="bg-[#1e1e1e] text-white p-4 overflow-x-auto text-sm font-mono">
          <code>{code}</code>
        </pre>
      ) : (
        <div 
          className="text-sm overflow-x-auto [&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!rounded-none [&_pre]:font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
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
        <h1 className="text-xm font-normal text-gray-500">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-700" />
        <h1 className="text-xm font-normal text-gray-700">API documentation</h1>
      </div>

      <h1 className="text-lg font-bold mb-4">API Reference</h1>
      <p className="text-gray-600 mb-8">
        Complete reference for all props and configurations.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Core Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className=" ">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Required</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-purple-500">checkoutType</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-xs">'paywall' | 'ecommerce' | 'donation'</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-sm bg-green-100 border border-green-200">Yes</code></td>
                <td className="border border-gray-300 px-4 py-2">Type of checkout experience</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">payment</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">PaymentDetails</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-sm bg-green-100 border border-green-200">Yes</code></td>
                <td className="border border-gray-300 px-4 py-2">Payment configuration object</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">theme</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">'light' | 'dark' | 'auto'</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-sm bg-gray-100 border border-gray-200">No</code></td>
                <td className="border border-gray-300 px-4 py-2">Theme mode (default: 'light')</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">styling</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">StyleConfig</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-sm bg-gray-100 border border-gray-200">No</code></td>
                <td className="border border-gray-300 px-4 py-2">Custom styling options</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-purple-500">metadata</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-xs">CheckoutMetadata</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="px-1 rounded text-sm bg-gray-100 border border-gray-200">No</code></td>
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
              <tr className=" ">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">buttonConfig</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">ButtonConfig</code></td>
                <td className="border border-gray-300 px-4 py-2">Customize the checkout button</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">triggerMode</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">'button' | 'manual'</code></td>
                <td className="border border-gray-300 px-4 py-2">How to trigger the modal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">open</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Controlled modal state</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onOpenChange</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(open: boolean) =&gt; void</code></td>
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
              <tr className=" ">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Callback</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onSuccess</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(result: PaymentResult, formData?: Record&lt;string, any&gt;) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called on successful payment</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onCancel</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when checkout is cancelled</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onError</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(error: Error) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called on payment error</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onFieldChange</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(fieldId: string, value: any) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when a field value changes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onWalletConnect</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(address: string, provider: WalletProvider) =&gt; void</code></td>
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
              <tr className=" ">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onClick</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Called when button is clicked</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">position</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">'top-right' | 'top-left' | etc.</code></td>
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
              <tr className=" ">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onContinueShopping</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Close cart view</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onProceedToCheckout</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">() =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Open checkout modal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">collectEmail</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Show email form</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">collectShipping</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">boolean</code></td>
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
              <tr className=" ">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">open</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">boolean</code></td>
                <td className="border border-gray-300 px-4 py-2">Modal open state</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onOpenChange</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(open: boolean) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">State change handler</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">payTo</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">string</code></td>
                <td className="border border-gray-300 px-4 py-2">Recipient wallet address</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-purple-500">onSuccess</code></td>
                <td className="border border-gray-300 px-4 py-2"><code className="  px-1 rounded text-xs">(result, checkoutData) =&gt; void</code></td>
                <td className="border border-gray-300 px-4 py-2">Success callback with cart items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">E-commerce Config with Cart</h2>
        <p className="mb-3">Enable cart by setting <code className="  px-1 rounded">enableCart: true</code> in ecommerceConfig:</p>
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