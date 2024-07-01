const { useState, useRef, useEffect } = React;
const Accordion = ({ children }) => {
  const [active, setActive] = useState(null);
  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };
  return (
    <div className="border border-gray-300 rounded mb-2 overflow-hidden">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          active,
          id: index,
          handleToggle,
        })
      )}
    </div>
  );
};
const AccordionSummary = ({ children, active, id, handleToggle }) => {
  console.log("active", active);
  return (
    <div
      className={`bg-gray-200 flex justify-between items-start p-3 cursor-pointer transition-colors ${
        active != null ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => handleToggle(id)}
    >
      <h5 className="font-medium text-lg">{children}</h5>
      <i
        className={`fa fa-chevron-down transition-transform ${
          active != null ? "transform rotate-180 text-white" : "text-gray-700"
        }`}
      ></i>
    </div>
  );
};
const AccordionDetails = ({ children, active, id }) => {
  const contentEl = useRef(null);
  useEffect(() => {
    if (contentEl.current) {
      contentEl.current.style.height =
        active != null ? `${contentEl.current.scrollHeight}px` : "0px";
    }
  }, [active, id]);
  return (
    <div
      ref={contentEl}
      className={`transition-height duration-300 overflow-hidden ${
        active != null ? "max-h-screen" : "max-h-0"
      }`}
      style={
        active != null
          ? { height: contentEl.current.scrollHeight }
          : { height: "0px" }
      }
    >
      {children}
    </div>
  );
};