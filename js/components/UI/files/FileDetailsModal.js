const FileDetailsModal = ({ file, onClose }) => {
  if (!file) return null;

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");
  const [isFullImageVisible, setIsFullImageVisible] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(file.data.url)
      .then(() => {
        setCopyMessage("URL copied!");
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file.data.url;
    link.download = file.data.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageClick = () => {
    setIsFullImageVisible(true);
  };

  const closeFullImage = () => {
    setIsFullImageVisible(false);
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-start border-b pb-4">
            <h2 className="text-xl font-semibold">File Details</h2>
            <button onClick={onClose} className="text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-black dark:fill-white"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>

          {copyMessage && (
            <div className="bg-green-100 text-green-700 p-2 rounded mt-4">
              {copyMessage}
            </div>
          )}

          <div className="mt-4 flex">
            <div className="flex-shrink-0 w-1/3">
              {file.data.type === "IMG" && file.data.url ? (
                <div className="relative">
                  {isImageLoading && (
                    <div className="w-full h-48 flex items-center justify-center absolute top-0 left-0">
                      <div
                        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                        role="status"
                      ></div>
                    </div>
                  )}
                  <img
                    src={file.data.url}
                    alt={file.data.name}
                    className={`max-w-full max-h-48 rounded-lg shadow-md transition-opacity duration-500 ${
                      isImageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setIsImageLoading(false)}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-48">
                  {getIcon(file.data.name)}
                </div>
              )}
            </div>
            <div className="ml-4 w-2/3">
              <p className="text-2xl font-semibold my-4">{file.data.name}</p>
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="text-gray-700 font-semibold pr-4 text-left">
                      Type:
                    </td>
                    <td className="ml-10">{file.data.type}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-700 font-semibold pr-4 text-left">
                      Size:
                    </td>
                    <td className="ml-10">{file.data.size} bytes</td>
                  </tr>
                  <tr>
                    <td className="text-gray-700 font-semibold pr-4 text-left">
                      Extension:
                    </td>
                    <td className="ml-10">{file.data.extension}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end gap-x-5 mt-6 w-full">
                <Button onClick={handleCopyLink} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-2 bi bi-files"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.5 0a.5.5 0 0 1 .5.5V1h7V.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H4a1 1 0 0 1-1-1V3.5a.5.5 0 0 1 .5-.5h10V1a1 1 0 0 1 1-1h1zM1 1.5A1.5 1.5 0 0 1 2.5 0H4a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5V1.5zM6 7a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H6z" />
                  </svg>
                  Copy Link
                </Button>
                <Button onClick={handleDownload} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-2 bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 12.5A.5.5 0 0 1 0 12V3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a.5.5 0 0 1-.5.5H.5zM1 3a1 1 0 0 0-1 1v8h14V4a1 1 0 0 0-1-1H1zm8 9a.5.5 0 0 1-.5-.5V11h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1V7a.5.5 0 0 1 1 0v2h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1v.5a.5.5 0 0 1-.5.5z" />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullImageVisible && ( // Full image modal
        <div className="fixed inset-0 flex items-center justify-center z-60 bg-black bg-opacity-80">
          <button
            onClick={closeFullImage}
            className="absolute top-4 right-4 text-white text-xl"
          >
            &times;
          </button>
          <img
            src={file.data.url}
            alt={file.data.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
