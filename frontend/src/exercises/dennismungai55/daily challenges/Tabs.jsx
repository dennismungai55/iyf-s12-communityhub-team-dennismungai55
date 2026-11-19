import { useState } from "react";

export default function Tabs({ tabs = [], defaultTab, className = "" }) {
  const initialId = defaultTab ?? tabs[0]?.id;
  const [activeId, setActiveId] = useState(initialId);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className={`w-full ${className}`}>
      <div role="tablist" className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          key={activeTab.id}
          role="tabpanel"
          className="mt-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
