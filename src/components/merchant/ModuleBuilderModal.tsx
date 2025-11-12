import React, { useState } from "react";
import { X, Copy, Info, Plus } from "lucide-react";

interface CustomField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface ModuleConfig {
  checkoutType: "paywall" | "ecommerce" | "donation";
  amount: string;
  depositAddress: string;
  collectEmail: boolean;
  showConfetti: boolean;
  title: string;
  product?: string;
  description: string;
  buttonText: string;
  primaryColor: string;
  buttonColor: string;
  customFields: CustomField[];
}

interface ModuleBuilderModalProps {
  module?: ModuleConfig;
  onClose: () => void;
  onSave: (config: ModuleConfig) => void;
}

const ModuleBuilderModal: React.FC<ModuleBuilderModalProps> = ({
  module,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<"code" | "configure" | "preview">("code");

  const [config, setConfig] = useState<ModuleConfig>(
    module || {
      checkoutType: "paywall",
      amount: "100",
      depositAddress: "1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC",
      collectEmail: true,
      showConfetti: true,
      title: "Premium Content",
      description: "Unlock this content with a one-time payment",
      buttonText: "",
      primaryColor: "",
      buttonColor: "",
      customFields: [],
    }
  );

  const [copied, setCopied] = useState(false);

  const generateCode = (): string => {
    return `<MneeCheckout
  checkoutType="paywall"
  payment={{
    amount: "1.00",
    mneeDepositAddress: "1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC",
  }}
  collectEmail={true}
  showConfetti={true}
  paywallConfig={{
    title: "Premium Content",
    description: "Unlock this content with a one-time payment",
  }}
  customFields={[
    {
      id: 'field_1762924025497',
      type: 'text',
      label: 'New Field',
    },
    {
      id: 'field_1762924027138',
      type: 'text',
      label: 'New Field',
    }
  ]}
  onSuccess={(result, formData) => {
    console.log('Payment success:', result, formData);
    // Send to your backend
  }}
  theme="dark"
/>`;
  };

  const generateBackendIntegration = (): string => {
    const customFieldsInterface = config.customFields.length > 0
      ? `  customFields: {
${config.customFields.map(f => `    // ${f.label || 'Custom Field'}
    '${f.id}'?: ${f.type === 'checkbox' ? 'boolean' : 'string'};`).join('\n')}
  };`
      : '  customFields: Record<string, any>;';

    const customFieldsSchema = config.customFields.length > 0
      ? JSON.stringify(config.customFields.map(f => ({
          id: f.id,
          type: f.type,
          label: f.label,
          placeholder: f.placeholder,
          required: f.required
        })), null, 2)
      : '[]';

    return `// Type definitions for integration
interface PaymentResult {
  transactionHash: string;
  amount: string;              // Total amount charged (includes tax + shipping if applicable)
  currency: string;
  from: string;                // Wallet address that paid
  to: string;                  // Recipient address
  timestamp: number;           // Unix timestamp
  networkId: number;
}

interface CheckoutFormData {
  email: string;
${customFieldsInterface}
}

// CustomFields schema reference (use this to map field IDs to labels, options, etc.)
const CUSTOM_FIELDS_SCHEMA = ${customFieldsSchema} as const;

// Helper: Get human-readable display value for any custom field
function getDisplayValue(fieldId: string, value: any): string {
  const field = CUSTOM_FIELDS_SCHEMA.find(f => f.id === fieldId);
  if (!field) return String(value);
  
  // For select/radio fields, return the option label
  if ((field.type === "select" || field.type === "radio") && field.options) {
    const option = field.options.find(opt => opt.value === value);
    return option?.label || String(value);
  }
  
  // For checkbox, return True/False
  if (field.type === "checkbox") {
    return value ? "True" : "False";
  }
  
  // For other types (text, number), return as-is
  return String(value);
}

// Helper: Get option details (for select/radio fields only)
function getOption(fieldId: string, optionValue: string) {
  const field = CUSTOM_FIELDS_SCHEMA.find(f => f.id === fieldId);
  return field?.options?.find(opt => opt.value === optionValue);
}

// Usage: getDisplayValue(fieldId, value) → "XX-Large" or "True" or "42"
//        getOption(fieldId, value)?.price → 2 (for price modifiers)

// Example: Send to your backend
async function handlePaymentSuccess(
  result: PaymentResult,
  formData: CheckoutFormData
) {
  const response = await fetch('/api/payments/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      transactionHash: result.transactionHash,
      amount: result.amount,
      currency: result.currency,
      from: result.from,
      to: result.to,
      timestamp: result.timestamp,
      networkId: result.networkId,
      customerEmail: formData.email,
      customerData: formData,
    }),
  });
  
  const data = await response.json();
  return data;
}`;
};

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
   const copyBackendType = () => {
    navigator.clipboard.writeText(generateBackendIntegration());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addCustomField = () => {
    setConfig((prev) => ({
      ...prev,
      customFields: [
        ...prev.customFields,
        {
          id: `field_${Date.now()}`,
          type: "text",
          label: "",
          placeholder: "",
          required: false,
        },
      ],
    }));
  };

  const deleteCustomField = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-900">Module builder</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="flex bg-[#F5F5F5] px-5 py-1 rounded-lg gap-3">
          {["configure", "code", "preview"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "configure" | "code" | "preview")}
              className={`px-4 py-1 text-sm font-medium border${
                activeTab === tab
                  ? "text-gray-900 border bg-white rounded-lg shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "code" && (
            <div className="space-y-6">
              <div className="bg-amber-100 border border-amber-400 rounded-lg p-2 flex items-start gap-3">
                <span className="text-yellow-600">⚠️</span>
                <p className="text-sm text-yellow-800">
                  Warning: Do not change the wallet destination address when pasting this code
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Component code</h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Copy size={16} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{generateCode()}</code>
                </pre>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Type definitions for backend integration</h3>
                  <button
                    onClick={copyBackendType}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Copy size={16} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{generateBackendIntegration()}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === "configure" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Checkout Type</label>
                <select
                  value={config.checkoutType}
                  onChange={(e) =>
                    setConfig({ ...config, checkoutType: e.target.value as ModuleConfig["checkoutType"] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="paywall">Paywall</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="donation">Donation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                <input
                  type="text"
                  value={config.amount}
                  onChange={(e) => setConfig({ ...config, amount: e.target.value })}
                  placeholder="Enter amount in USD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  MNEE Deposit Address
                  <div className="group relative">
                    <Info size={16} className="text-gray-400 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                      Customer funds will be sent to this wallet address.
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={config.depositAddress}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Options</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.collectEmail}
                    onChange={(e) => setConfig({ ...config, collectEmail: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Collect Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.showConfetti}
                    onChange={(e) => setConfig({ ...config, showConfetti: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Show Confetti on Success</span>
                </label>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  {config.checkoutType.charAt(0).toUpperCase() + config.checkoutType.slice(1)} Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={config.title}
                      onChange={(e) => setConfig({ ...config, title: e.target.value })}
                      placeholder="Enter title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={config.description}
                      onChange={(e) => setConfig({ ...config, description: e.target.value })}
                      placeholder="Enter description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">Styling</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text (optional)
                    </label>
                    <input
                      type="text"
                      value={config.buttonText}
                      onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                      placeholder="Complete Payment"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color (optional)
                    </label>
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      placeholder="#000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Color (optional)
                    </label>
                    <input
                      type="text"
                      value={config.buttonColor}
                      onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
                      placeholder="#0066FF"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Custom Fields (Product Options, etc.)</h3>
                {config.customFields.length === 0 ? (
                  <p className="text-sm text-gray-500 mb-3">
                    No custom fields added yet. Add fields like size, color, format, etc.
                  </p>
                ) : (
                  <div className="space-y-3 mb-3">
                    {config.customFields.map((field, index) => (
                      <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-sm text-gray-900">Field #{index + 1}</h4>
                          <button
                            onClick={() => deleteCustomField(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Field ID</label>
                            <input
                              type="text"
                              value={field.id}
                              readOnly
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Type</label>
                            <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded">
                              <option>Text</option>
                              <option>Number</option>
                              <option>Select</option>
                              <option>Radio</option>
                              <option>Checkbox</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Label</label>
                            <input
                              type="text"
                              placeholder="Field label"
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Placeholder</label>
                            <input
                              type="text"
                              placeholder="Placeholder text"
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 mt-3">
                          <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                          <span className="text-sm text-gray-700">Required Field</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={addCustomField}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus size={16} />
                  Add Field
                </button>
              </div>
            </div>
          )}

          {activeTab === "preview" && (
            <div>
              <h3 className="font-medium text-gray-900 mb-6">Live preview</h3>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-8 w-full max-w-md text-gray-600 border shadow-xm">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{config.title}</h2>
                    <p className="text-gray-300 text-sm">{config.description}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-800 text-sm">Amount</span>
                      <span className="text-lg font-semibold">{config.amount}.00 MNEE</span>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-800 text-sm mb-2">Deposit Address</label>
                      <div className="flex items-center gap-2 bg-gray-100 rounded p-2">
                        <span className="text-xs flex-1 truncate font-mono">
                          {config.depositAddress}
                        </span>
                        <button className="text-gray-300 hover:text-white">
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                    {config.collectEmail && (
                      <div className="mb-4">
                        <label className="block text-gray-800 text-sm mb-2">Email Address</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-3 py-2 bg-gray-100 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                    <button className="w-full bg-gray-800 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors">
                      {config.buttonText || "Complete Payment"}
                    </button>
                    <div className="text-center mt-3 text-xs text-gray-800 flex items-center justify-center gap-1">
                      🔒 Secure Crypto Payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => onSave(config)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Save Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleBuilderModal;
