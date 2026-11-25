import { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = {
    home: "Welcome to CommunityHub!",
    about: "CommunityHub connects developers and learners.",
    contact: "Contact us to become part of our community.",
  };

  return (
    <section>
      <h2>CommunityHub Tabs</h2>

      <div role="group" aria-label="Choose a tab">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div>
        <p>{tabs[activeTab]}</p>
      </div>
    </section>
  );
}

export default Tabs;
