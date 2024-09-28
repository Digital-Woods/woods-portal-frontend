const FileTable = ({ fileId, files, toggleFolder, path, refetch }) => {
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Initialize activeDropdown state
  const [alert, setAlert] = useState({ message: "", type: "", show: false }); // Alert state
  const [loadingFileId, setLoadingFileId] = useState(null); // Track which file is being deleted

  const { me } = useMe(); // Assuming you have a hook to get user context

  // Define the query for fetching file details
  const {
    data: fileDetails,
    isLoading,
    isError,
  } = useQuery(
    ["fileDetails", selectedFileId, path, me],
    () => Client.files.getDetails(me, path, selectedFileId, fileId),
    {
      enabled: !!selectedFileId,
      onSuccess: (data) => {
        console.log("File Details fetched successfully:", data);
      },
      onError: (error) => {
        console.error("Error fetching file details:", error);
      },
    }
  );

  const deleteFileMutation = useMutation(
    (file) => Client.files.deleteafile(me, path, file.id, fileId),
    {
      onMutate: (file) => {
        setLoadingFileId(file.id); // Set loading state for the file
        setAlert({ message: "Deleting file...", type: "info", show: true }); // Show the alert as "Deleting..."
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["fileDetails"]);
        console.log("File deleted successfully");
        refetch();

        // Update the alert to show success
        setAlert({
          message: "File deleted successfully!",
          type: "success",
          show: true,
        });
        setLoadingFileId(null); // Clear the loading state
      },
      onError: (error) => {
        console.error("Error deleting file:", error);

        // Update the alert to show an error
        setAlert({
          message: "Error deleting file!",
          type: "error",
          show: true,
        });
        setLoadingFileId(null); // Clear the loading state
      },
    }
  );

  const handleRowClick = (file) => {
    if (file.type === "folder" && file.child && file.child.length > 0) {
      toggleFolder(file);
    } else {
      setSelectedFileId(file.id); // Set the selected file ID to trigger the query
    }
  };

  const closeModal = () => {
    setSelectedFileId(null);
  };

  const handleDownload = (file, e) => {
    e.stopPropagation();
    console.log("Downloading:", file);
  };

  const handleTrash = (file, e) => {
    e.stopPropagation();

    // Call the delete file mutation with the file object
    deleteFileMutation.mutate(file);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index); // Toggle dropdown visibility
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const renderFiles = (files) => {
    if (!files || files.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-gray-500">
            No files available
          </TableCell>
        </TableRow>
      );
    }

    return files.map((file, index) => (
      <React.Fragment key={file.id}>
        <TableRow
          className={`border-t relative cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-300`}
          onClick={() => handleRowClick(file)}
        >
          <TableCell className="px-4 py-2 text-xs">
            <div>{getIconType(file.type)}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-xs">
            <div className="dark:text-white">{file.name}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-right text-xs">
            <div>{file.type}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-right text-xs">
            <div>{file.size}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-right relative">
            <div className="relative">
              <button
                className="border border-gray-200 dark:text-white text-xs px-3 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(index); // Toggle dropdown visibility
                }}
              >
                Actions
              </button>
              {activeDropdown === index && ( // Check against the new state
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-200 border rounded-lg shadow-lg z-50">
                  {file.type !== "folder" && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-dark-300"
                      onClick={(e) => handleDownload(file, e)}
                    >
                      Download
                    </button>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-dark-300"
                    onClick={(e) => handleTrash(file, e)}
                    disabled={loadingFileId === file.id} // Disable button if loading
                  >
                    {loadingFileId === file.id ? ( // Show spinner if deleting
                      <svg
                        className="animate-spin h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-1.664 1.664A10 10 0 012.341 9H0v5.291h6zm10-5.291V0h2v10h-2zm4 2v-2h2v2h-2zm0-6v2h-2V4h2zm-6 4h4v-2h-4v2zm-2 0h2v-2h-2v2z"
                        ></path>
                      </svg>
                    ) : (
                      "Trash"
                    )}
                  </button>
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <div className="table-container">
      <table className="table-auto w-full mb-6">
        <thead className="bg-gray-100 text-left dark:bg-dark-200">
          <tr>
            <th className="px-4 py-2 text-xs">Type</th>
            <th className="px-4 py-2 text-xs">Name</th>
            <th className="px-4 py-2 text-xs text-right">File Type</th>
            <th className="px-4 py-2 text-xs text-right">Size</th>
            <th className="px-4 py-2 text-xs"></th>
          </tr>
        </thead>
        <tbody>{renderFiles(files)}</tbody>
      </table>
      {selectedFileId && (
        <FileDetailModal
          file={fileDetails}
          onClose={closeModal}
          loading={isLoading}
          error={isError}
        />
      )}

      {/* Show the alert */}
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
          duration={2000} // Auto-close after 2 seconds
        />
      )}
    </div>
  );
};
