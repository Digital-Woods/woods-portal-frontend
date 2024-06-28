const { useState, useRef, useEffect } = React;
const classNames = window.classNames;

const Select = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <SelectSection setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && children}
    </div>
  );
};

const SelectSection = ({ setIsOpen, isOpen }) => {
  return (
    <SelectButton
      className="px-4 hover:bg-gray-700 transition-colors active:bg-gray-600 py-2 bg-gray-800 rounded-md shadow-sm text-white font-medium"
      setIsOpen={setIsOpen}
      isOpen={isOpen}
    >
      Click me
    </SelectButton>
  );
};

const Options = React.forwardRef(({ children, className }, ref) => (
  <div
    className={`absolute text-sm w-40 text-white bg-gray-800 p-1 shadow-lg rounded-md right-0 mt-2 ${className}`}
    ref={ref}
  >
    {children}
  </div>
));

const Option = React.forwardRef(({ children, className }, ref) => {
  return (
    <div
      as="button"
      className={classNames(
        "w-full rounded-md text-center py-2 hover:bg-gray-700",
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  );
});

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const SelectButton = ({ children, setIsOpen, isOpen, ...props }) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)} {...props}>
      {children}
    </button>
  );
};

const Items = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Item = ({ as: Component, children, ...props }) => {
  return <Component  onClick={() => setIsOpen(!isOpen)} {...props}>{children}</Component>;
};
