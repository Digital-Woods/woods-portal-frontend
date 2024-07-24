const { useState } = React;

const Tooltip = ({ children, content }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {isVisible && (
          <div className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded-md">
            {content}
          </div>
        )}
        {children}
      </div>
    ); 
  };