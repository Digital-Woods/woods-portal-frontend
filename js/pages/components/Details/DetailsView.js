const DetailsView = ({ item, sortItems }) => {
  const [viewDialog, setViewDialog] = useState(false);

  return (
    <div className="p-3 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
      {sortItems.length > 0 &&
        sortItems.map((value, index) => (
          <div
            key={value.name}
            className={`py-2 flex ${index === sortItems.length - 1 ? "" : ""}`}
          >
            <div className="text-sm font-semibold w-[200px]">
              {value.label}:
            </div>
            <div className="text-sm text-gray-500 ">
              {renderCellContent(value.value)}
            </div>
          </div>
        ))}

      {item.iframe_url && (
        <div className={`py-2 flex`}>
          <div className="text-sm font-semibold w-[200px]">Document:</div>
          <div className="text-sm text-gray-500 ">
            <div className="flex justify-end">
              <Button
                className="bg-white dark:bg-white hover:bg-white text-blue-important"
                variant="outline"
                size="lg"
                onClick={() => setViewDialog(true)}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={viewDialog}>
        <div className="bg-white dark:bg-dark-100 dark:text-white rounded-md flex-col justify-start items-center inline-flex w-[90vw] h-[90vh]">
          {/* <div className='w-[100%] h-[100%]'> */}
          <div className="flex justify-end w-[100%]">
            <div
              className="cursor-pointer"
              onClick={() => setViewDialog(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          </div>
          <iframe
            id="frame"
            src={item.iframe_url}
            width="100%"
            height="100%"
          ></iframe>
          {/* </div> */}
        </div>
      </Dialog>
    </div>
  );
};
