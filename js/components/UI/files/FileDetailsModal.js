const FileDetailModal = ({ file, onClose }) => {
  if (!file) return null;

  const [isImageLoading, setIsImageLoading] = useState(true); // State for image loading

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-auto">
        {file.data.type === "IMG" && file.data.url && (
          <div className="mb-4 flex justify-center">
            {isImageLoading && (
              <div className="w-full h-48 flex items-center justify-center">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                ></div>
              </div>
            )}

            <img
              src={file.data.url}
              alt={file.data.name}
              className={`max-w-full max-h-48 mx-auto rounded-lg shadow-md transition-opacity duration-500 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`} // Transition effect to fade in the image
              onLoad={() => setIsImageLoading(false)} // Set loading to false once image is loaded
            />
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">{file.data.name}</h2>

        {/* File details in a table format */}
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

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
