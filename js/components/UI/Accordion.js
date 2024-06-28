const { useState, useRef, useEffect } = React;

const AccordionItem = ({ handleToggle, active, faq }) => {
  const contentEl = useRef();
  const { header, id, text } = faq;

  return (
    <div className="border border-gray-300 rounded mb-2 overflow-hidden">
      <div className="bg-gray-200">
        <div
          className={`flex justify-between items-start p-3 cursor-pointer transition-colors ${
            active === id
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="font-medium text-lg">{header}</h5>
          <i
            className={`fa fa-chevron-down transition-transform ${
              active === id
                ? "transform rotate-180 text-white"
                : "text-gray-700"
            }`}
          ></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`transition-height duration-300 overflow-hidden ${
          active === id ? "max-h-screen" : "max-h-0"
        }`}
        style={
          active === id
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="p-4">
          <p className="mb-0 text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items, active, handleToggle }) => {
  return items.map((faq, index) => {
    return (
      <AccordionItem
        key={index}
        active={active}
        handleToggle={handleToggle}
        faq={faq}
      />
    );
  });
};
