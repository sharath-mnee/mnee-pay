import React, { useState } from "react";
import { Wrench } from "lucide-react";
import ModuleCard from "../components/merchant/ModuleCard";
import ModuleBuilderModal from "../components/merchant/ModuleBuilderModal";
import { type ModuleData } from "../components/merchant/ModuleCard";
import { type ModuleConfig } from "../components/merchant/ModuleBuilderModal";

const MerchantToolsPage: React.FC = () => {
  const [modules, setModules] = useState<ModuleData[]>([
    {
        id: 1, title: "Premium content", type: "paywall",
        checkoutType: "paywall",
        amount: "10",
        depositAddress: "1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC",
        collectEmail: true,
        showConfetti: false,
        description: "Unlock this content with a one-time payment",
        buttonText: "",
        primaryColor: "",
        buttonColor: "",
        customFields: []
    },
    {
        id: 2, product: "Starbucks coffee", type: "ecommerce", title: "Cart",
        checkoutType: "ecommerce",
        amount: "30",
        depositAddress: "1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC",
        collectEmail: true,
        showConfetti: true,
        description: "Shop online with crypto",
        buttonText: "",
        primaryColor: "",
        buttonColor: "",
        customFields: []
    },
    {
        id: 3, title: "Kids fighting cancer", type: "donation",
        checkoutType: "donation",
        amount: "150",
        depositAddress: "1FWXM7CzyRSFFn1PQwwuTSCyMucXHLhmeC",
        collectEmail: true,
        showConfetti: true,
        description: "Your contribution helps us continue our work",
        buttonText: "",
        primaryColor: "",
        buttonColor: "",
        customFields: []
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleData | undefined>(undefined);

  const handleOpenModule = (module: ModuleData) => {
    setSelectedModule(module);
    setShowModal(true);
  };

  const handleCreateModule = () => {
    setSelectedModule(undefined);
    setShowModal(false);
  };

  const handleSaveModule = (config: ModuleConfig) => {
    if (selectedModule) {
      setModules(
        modules.map((m) => (m.id === selectedModule.id ? { ...m, ...config } : m))
      );
    } else {
      setModules([...modules, { id: Date.now(), ...config } as unknown as ModuleData]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-7 bg-white h-screen">
      <div className="flex items-center justify-between pt-1 pb-11">
        <div className="flex items-center">
          <Wrench size={20} className="text-gray-800" />
          <div className="h-4 w-px bg-gray-300 mx-4" />
          <h1 className="text-xl font-normal text-gray-900">Merchant tools</h1>
        </div>
        
      </div>

      <div className="mb-8 border p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Your modules</h2>
            <button
            onClick={handleCreateModule}
            className="flex items-center gap-2 px-4 py-2 bg-[#D97706] text-white rounded-lg hover:bg-orange-500"
            >
            Create module
            </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
            Add the option to pay with crypto to your React-based website or application.
        </p>

        <div className="space-y-3">
            {modules.map((module) => (
            <ModuleCard key={module.id} module={module} onOpen={handleOpenModule} />
            ))}
        </div>
      </div>

      {showModal && (
        <ModuleBuilderModal
          module={selectedModule}
          onClose={() => setShowModal(false)}
          onSave={handleSaveModule}
        />
      )}
    </div>
  );
};

export default MerchantToolsPage;
