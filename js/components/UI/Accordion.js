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
    <div className="border border-gray-300 rounded mb-2 overflow-hidden dark:bg-gray-900 dark:text-white">
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
  return (
    <div
      className={`flex justify-between items-start p-4 cursor-pointer transition-colors ${
        active != null ? "" : ""
      }`}
      onClick={() => handleToggle(id)}
    >
      <h5 className="font-medium text-sm">{children}</h5>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className={`transition-transform duration-300 ${
          active === id ? "rotate-180" : ""
        } dark:fill-white`}
      >
        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
      </svg>
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
      className={`transition-height duration-300 px-4 overflow-hidden ${
        active != null ? "max-h-screens" : "max-h-0"
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
