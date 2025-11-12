import React from "react";

interface CustomField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface ModuleData {
  id?: number;
  title: string;
  type: "paywall" | "ecommerce" | "donation";
  product?: string;
  checkoutType: "paywall" | "ecommerce" | "donation";
  amount: string;
  depositAddress: string;
  collectEmail: boolean;
  showConfetti: boolean;
  description: string;
  buttonText: string;
  primaryColor: string;
  buttonColor: string;
  customFields: CustomField[];
}

interface ModuleCardProps {
  module: ModuleData;
  onOpen: (module: ModuleData) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onOpen }) => {
  const getModuleTitle = (): string => {
    if (module.type === "paywall" || module.type === "donation") {
      return module.title;
    }
    return module.product || module.title;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{getModuleTitle()}</h3>
          <p className="text-sm text-gray-500">Module type: {module.type}</p>
        </div>
        <button
          onClick={() => onOpen(module)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
