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
    window.open(file.data.url, "_blank");
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
        <div className="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-xl w-full max-w-[720px] min-h-[380px] max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="font-semibold dark:text-white">{file.data.name}</h2>
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
          <div className="mt-4 flex md:flex-row flex-col gap-4 h-full items-end">
            {file.data.url ? (
              file.data.type === "IMG" ? (
                <div>
                  {isImageLoading && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                        role="status"
                      ></div>
                    </div>
                  )}

                  <img
                    src={file.data.url}
                    alt={file.data.name}
                    className={`max-w-full max-h-full mx-auto rounded-lg shadow-md transition-opacity duration-500 ${isImageLoading ? "opacity-0" : "opacity-100"
                      }`}
                    onLoad={() => setIsImageLoading(false)}
                  />
                </div>
              ) : (
                <iframe
                  src={file.data.url}
                  title={file.data.name}
                  className="w-full h-[271px] border-0 rounded-lg shadow-md"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )) : null}

            <div className="">
              <div className="mt-4 w-full">
                <table className="w-full table-auto">
                  <tbody>
                    <tr>
                      <td className="pr-1 text-sm whitespace-nowrap align-top">
                        Type:
                      </td>
                      <td className="pl-1 text-sm text-gray-500 align-top" >{file.data.type}</td>
                    </tr>
                    <tr>
                      <td className="pr-1 text-sm whitespace-nowrap align-top">
                        Size:
                      </td>
                      <td className="pl-1 text-sm text-gray-500 align-top" >{file.data.size}</td>
                    </tr>
                    {file.data.extension &&
                      <tr>
                        <td className="pr-1 text-sm whitespace-nowrap align-top">
                          Extension:
                        </td>
                        <td className="pl-1 text-sm text-gray-500 align-top" >{file.data.extension}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-x-5 mt-6 w-full">
                <Button onClick={handleCopyLink} className="flex items-center"   size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    className="fill-white mr-2"
                  >
                    <path d="M362.31-260q-27.01 0-45.66-18.65Q298-297.3 298-324.31v-455.38q0-27.01 18.65-45.66Q335.3-844 362.31-844h359.38q27.01 0 45.66 18.65Q786-806.7 786-779.69v455.38q0 27.01-18.65 45.66Q748.7-260 721.69-260H362.31Zm0-52h359.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q174-173.3 174-200.31v-507.38h52v507.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h411.38v52H238.31ZM350-312v-480 480Z" />
                  </svg>
                  Copy Link
                </Button>
                <Button onClick={handleDownload} className="flex items-center"   size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    className="fill-white mr-2"
                  >
                    <path d="M240-212q-71.92 0-121.96-51.12Q68-314.23 68-386.15q0-74.39 52-126.54 52-52.16 123.92-45.62 16.54-78.15 80.31-131.8Q388-743.77 454-743.77q21.24 0 36.62 13.73Q506-716.31 506-693.77v270.62l66.23-67L609.38-453 480-323.62 350.62-453l37.15-37.15 66.23 67v-270.62q-70.61 11.62-118.31 65.96Q288-573.46 283-504h-43q-49.71 0-84.86 35.2-35.14 35.2-35.14 85t35.14 84.8q35.15 35 84.86 35h504q40.32 0 68.16-27.77 27.84-27.78 27.84-68Q840-400 812.16-428q-27.84-28-68.16-28h-72v-72q0-35.77-17-68.77-17-33-49-59.23v-60.31q54.15 28.08 86.08 78.61Q724-587.17 724-528v20h12.31q64.23-3.08 109.96 40.35Q892-424.23 892-361q0 62.92-43.54 105.96Q804.92-212 744-212H240Zm240-297.38Z" />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        isFullImageVisible && (
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
        )
      }
    </div >
  );
};
