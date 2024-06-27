const Tabs = ({ children, defaultValue = "account", className }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleTabClick = (value) => {
    setSelectedValue(value);
  };

  // Filter children to separate TabsList and content components
  const tabs = children.filter((child) => child.type.name === "TabsList");
  const contents = children.filter(
    (child) => child.type.name === "TabsContent"
  );

  // Throw error if structure is incorrect
  if (tabs.length !== 1 || contents.length !== children.length - 1) {
    throw new Error(
      "Tabs component requires exactly one TabsList and content for each tab trigger."
    );
  }

  // Map over tabs and contents to generate JSX elements
  const tabsList = tabs[0].props.children.map((trigger) => (
    <TabsTrigger
      key={trigger.props.value}
      value={trigger.props.value}
      isActive={selectedValue === trigger.props.value}
      onClick={handleTabClick}
    >
      {trigger.props.children}
    </TabsTrigger>
  ));

  const tabContents = contents.map((content) => (
    <TabsContent
      key={content.props.value}
      hidden={selectedValue !== content.props.value}
    >
      {content.props.children}
    </TabsContent>
  ));

  return (
    <div className={`Tabs ${className}`}>
      <TabsList className="grid w-full grid-cols-2">{tabsList}</TabsList>
      {tabContents}
    </div>
  );
};

const TabsList = ({ children, className }) => (
  <ul
    className={`flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 TabsList ${className}`}
  >
    {children}
  </ul>
);

const TabsTrigger = ({ value, isActive, onClick, children }) => (
  <li
    className={`me-2 TabsTrigger ${isActive ? "active" : ""}`}
    role="tab"
    aria-selected={isActive}
    onClick={() => onClick(value)}
  >
    <a
      className={`inline-block px-3 py-2 cursor-pointer text-white rounded-lg ${
        isActive ? "bg-black" : ""
      }`}
      aria-current="page"
    >
      {children}
    </a>
  </li>
);

const TabsContent = ({ value, hidden, children }) => (
  <div
    className={`TabsContent ${hidden ? "hidden" : ""}`}
    role="tabpanel"
    aria-labelledby={`tab-${value}`}
  >
    {children}
  </div>
);