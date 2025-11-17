import React, { useState } from "react";
import { Wrench, ChevronRight, X } from "lucide-react";
import ModuleCard from "../ModuleCard";
import ModuleBuilderModal from "../ModuleBuilderModal";
import { type ModuleData } from "../ModuleCard";
import { type ModuleConfig } from "../ModuleBuilderModal";

const Modules: React.FC = () => {
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
//   const [modules, setModules] = useState<ModuleData[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleData | undefined>(undefined);
  const [defaultTab, setDefaultTab] = useState<"code" | "configure" | "preview">("code");

  const [showCreateModuleModal, setShowCreateModuleModal] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleType, setModuleType] = useState("");

    const handleOpenModule = (module: ModuleData, tab?: "code" | "configure" | "preview") => {
    setSelectedModule(module);
    setDefaultTab(tab || "code");
    setShowModal(true);
  };

  const handleCreateModule = () => {
    setShowCreateModuleModal(true);
  };

  const handleConfirmCreateModule = () => {
    if (moduleName && moduleType) {
      const newModule: ModuleData = {
        id: Date.now(),
        title: moduleName,
        type: moduleType as "paywall" | "ecommerce" | "donation",
        checkoutType: moduleType as "paywall" | "ecommerce" | "donation",
        amount: "",
        depositAddress: "",
        collectEmail: false,
        showConfetti: false,
        description: "",
        buttonText: "",
        primaryColor: "",
        buttonColor: "",
        customFields: []
      };
      setModules([...modules, newModule]);
      setSelectedModule(newModule);
      setDefaultTab("configure");
      setShowCreateModuleModal(false);
      setShowModal(true);
      setModuleName("");
      setModuleType("");
    }
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
      <div className="flex items-center pt-3 pb-12">
        <Wrench size={20} className="text-gray-800" />
        <div className="h-4 w-px bg-gray-300 mx-4" />
        <h1 className="text-xm font-normal text-gray-500">Merchant tools</h1>
        <ChevronRight size={20} className="text-gray-700" />
        <h1 className="text-xm font-normal text-gray-700">Modules</h1>
      </div>

      <div className="border p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Your modules</h2>
            <button
            onClick={handleCreateModule}
            className="flex items-center gap-2 px-4 py-1 bg-[#D97706] text-white rounded-lg hover:bg-orange-500"
            >
            Create module
            </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
            Add the option to pay with crypto to your React-based website or application.
        </p>

        {modules.length === 0 ? (
          <div className="text-center text-gray-500">
          </div>
        ) : (
          <div className="space-y-3">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} onOpen={handleOpenModule} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ModuleBuilderModal
          module={selectedModule}
          onClose={() => setShowModal(false)}
          onSave={handleSaveModule}
          defaultTab={defaultTab}
        />
      )}

      {showCreateModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[400px] p-6 relative">

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">Create Module</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Create a new payment module to embed on your website.
                </p>
              </div>

              <button onClick={() => setShowCreateModuleModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
              <input
                type="text"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none shadow-sm"
                placeholder="Name your module"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Module Type</label>
              <select
                value={moduleType}
                onChange={(e) => setModuleType(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none bg-white"
              >
                <option value="">Select type</option>
                <option value="paywall">Paywall</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="donation">Donations</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCreateModuleModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmCreateModule}
                className="px-4 py-2 rounded-lg text-white bg-[#D97706] hover:bg-orange-500 transition-colors text-sm"
              >
                Create Module
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Modules;
