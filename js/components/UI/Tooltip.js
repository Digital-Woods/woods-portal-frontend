const { useState } = React;

const Tooltip = ({ children, content, right }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block" // Ensure the parent is inline-block for proper positioning
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div
          className={`absolute z-50 ${
            right
              ? "left-full top-1/2 transform -translate-y-1/2 ml-2"
              : "bottom-full mb-2"
          } 
            px-2 py-1 text-sm text-white bg-black rounded-md whitespace-nowrap`}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  );
};
