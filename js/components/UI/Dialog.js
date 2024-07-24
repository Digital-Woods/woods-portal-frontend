const Dialog = ({ open, onClose = null, ...props }, ref) => {
  const showOverlay = () => {
    if (!open) {
      return null;
    }

    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto" onClick={() => onClose && onClose(false)}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 dark:bg-gray-900 " {...props} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div ref={ref}>{showOverlay()}</div>;
};
