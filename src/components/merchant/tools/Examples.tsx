import React, { useState, useEffect } from 'react';
import { Wrench, ChevronRight, Copy, ChevronDown, ChevronUp } from 'lucide-react';

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
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'tsx' }) => {
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlight = async () => {
      try {
        const shiki = await import('shiki');
        
        const highlighter = await shiki.createHighlighter({
          themes: ['dark-plus'],
          langs: ['tsx', 'typescript', 'javascript', 'jsx'],
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
    <div className="relative border border-gray-700 rounded-lg overflow-hidden">
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

interface ExampleCardProps {
  title: string;
  description: string;
  tags: string[];
  codeTitle: string;
  codeSnippet: string;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ title, description, tags, codeTitle, codeSnippet }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 mb-3">{description}</p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4">
              {isExpanded ? (
                <ChevronUp size={24} className="text-gray-600" />
              ) : (
                <ChevronDown size={24} className="text-gray-600" />
              )}
            </div>
          </div>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <span className="text-sm text-gray-600 block mb-2">{codeTitle}</span>
          <CodeBlock code={codeSnippet} language="tsx" />
        </div>
      )}
    </div>
  );
};

const Examples: React.FC = () => {
  const examples = [
    {
      title: 'Subscription Paywall',
      description: 'Monthly subscription management with crypto payments',
      tags: ['React', 'TypeScript'],
      codeTitle: 'PaywallExample.tsx',
      codeSnippet: `import { MneeCheckout } from '@mnee/checkout';

function PremiumArticle() {
  return (
    <div>
      <h1>Premium Article</h1>
      <p>This is a preview of premium content...</p>
      <MneeCheckout
        checkoutType="paywall"
        payment={{
          amount: 5,
          mneeDepositAddress: '1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC',
        }}
        paywallConfig={{
          title: 'Unlock Premium Content',
          description: 'Get lifetime access to this article',
          unlockMessage: 'Unlock for $5',
        }}
        collectEmail={true}
        theme="dark"
        styling={{
          borderRadius: 'xl',
          primaryColor: '#8b5cf6',
          buttonColor: '#8b5cf6',
        }}
        onSuccess={(result, formData) => {
          console.log('Payment successful!', result);
          console.log('User email:', formData.email);
          // Unlock content, save to database, etc.
        }}
        showConfetti
      />
    </div>
  );
}`
    },
    {
      title: 'E-commerce Checkout',
      description: 'Complete checkout flow with crypto payment integration',
      tags: ['React', 'TypeScript', 'Next.js'],
      codeTitle: 'ProductPage.tsx',
      codeSnippet: `import { MneeCheckout } from '@mnee/checkout';

function ProductPage() {
  return (
    <div>
      <h1>Premium T-Shirt</h1>
      <img src="/product.jpg" alt="Product" />
      <p>$29.99</p>
      <MneeCheckout
        checkoutType="ecommerce"
        payment={{
          amount: 29.99,
          mneeDepositAddress: '1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC',
        }}
        ecommerceConfig={{
          productName: 'Premium T-Shirt',
          productDescription: 'High-quality cotton',
          productImage: '/product.jpg',
          showQuantitySelector: true,
          shippingCost: 5,
          taxRate: 0.08,
        }}
        customFields={[
          {
            id: 'size',
            type: 'select',
            label: 'Size',
            placeholder: 'Select size',
            options: [
              { label: 'Small', value: 'S' },
              { label: 'Medium', value: 'M' },
              { label: 'Large', value: 'L' },
              { label: 'X-Large', value: 'XL' },
            ],
            validation: { required: true },
          },
          {
            id: 'color',
            type: 'radio',
            label: 'Color',
            options: [
              { label: 'Black', value: 'black' },
              { label: 'White', value: 'white' },
              { label: 'Navy', value: 'navy' },
            ],
            validation: { required: true },
          },
        ]}
        collectEmail={true}
        collectShipping={true}
        onSuccess={(result, formData) => {
          console.log('Order placed!', result);
          console.log('Shipping to:', formData.shipping);
          console.log('Selected options:', formData.customFields);
        }}
      />
    </div>
  );
}`
    },
    {
      title: 'Donation Widget',
      description: 'Embeddable donation widget for non-profit websites',
      tags: ['React', 'JavaScript'],
      codeTitle: 'DonationPage.tsx',
      codeSnippet: `import { MneeCheckout } from '@mnee/checkout';

function CreatorTipJar() {
  return (
    <div>
      <h1>Support My Work</h1>
      <p>Your support helps me create more amazing content!</p>
      <MneeCheckout
        checkoutType="donation"
        payment={{
          amount: 5,
          mneeDepositAddress: '1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC',
        }}
        donationConfig={{
          organizationName: '@CreatorName',
          title: 'Buy Me a Coffee ☕',
          description: 'Your support helps me create more amazing content!',
          suggestedAmounts: [1, 5, 10, 20],
          allowCustomAmount: true,
          minAmount: 1,
          collectMessage: true,
          messagePlaceholder: 'Leave a nice message... (optional)',
          buttonText: 'Send Tip',
        }}
        collectEmail={false}
        styling={{
          borderRadius: 'xl',
          primaryColor: '#f59e0b',
          buttonColor: '#f59e0b',
        }}
        onSuccess={(result, formData) => {
          console.log('Tip received!', result);
          console.log('Amount:', formData.donationAmount);
          console.log('Message:', formData.message);
        }}
        showConfetti
      />
    </div>
  );
}`
    }
  ];

  return (
    <div className="px-7 py-7 overflow-y-auto w-full text-gray-800">
      <div className="flex items-center pt-3 pb-12">
        <Wrench size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300 mx-4" />
        <h1 className="text-xm font-normal text-gray-500">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-700" />
        <h1 className="text-xm font-normal text-gray-700">Examples</h1>
      </div>
      <div className='border p-6 rounded-lg'>
        <h1 className="text-lg font-medium mb-4 text-gray-900">Integration Examples</h1>
        <p className="text-gray-600 mb-6 tex-sm">
            Browse through real-world examples and code samples to help you integrate MNEE PAY into your application.
        </p>
        <section>
            {examples.map((example, index) => (
            <ExampleCard key={index} {...example} />
            ))}
        </section>
      </div>
    </div>
  );
};

export default Examples;