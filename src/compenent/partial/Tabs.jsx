import { useState } from "react";

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">

      {/* Tab Header */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            disabled={tab?.disabled}
            key={index}
            onClick={() => setActive(index)}
            className={`px-4 py-2 -mb-px text-sm font-medium transition-all
              ${active === index 
                ? "border-b-2 border-blue-500 text-blue-600" 
                : "text-gray-600 hover:text-blue-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs[active].content}
      </div>

    </div>
  );
}
