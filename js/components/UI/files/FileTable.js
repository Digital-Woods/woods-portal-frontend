const FileTable = ({ fileId, files, toggleFolder, path, refetch }) => {
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Initialize activeDropdown state
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
      onSuccess: () => {
        queryClient.invalidateQueries(["fileDetails"]);
        console.log("File deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting file:", error);
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

    deleteFileMutation.mutate(file);
    refetch();
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
                  >
                    Trash
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
    </div>
  );
};
