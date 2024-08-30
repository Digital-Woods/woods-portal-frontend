const Dialog = ({ open, onClose = null, className, ...props }, ref) => {
  const showOverlay = () => {
    if (!open) {
      return null;
    }

    return (
      <div
        className="relative z-[9999]"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          className="fixed inset-0 z-10 w-screen overflow-y-auto"
          onClick={() => onClose && onClose(false)}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className={`relative transform overflow-hidden rounded-lg ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="bg-cleanWhite px-4  sm:p-6 dark:bg-dark-100"
                {...props}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div ref={ref}>{showOverlay()}</div>;
};
