const FileTable = ({ fileId, files, toggleFolder, path, refetch }) => {
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const [loadingFileId, setLoadingFileId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [fileToDelete, setFileToDelete] = useState(null);

  const { me } = useMe();

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
        setLoadingFileId(file.id);
        setAlert({ message: "Deleting file...", type: "info", show: true });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["fileDetails"]);
        console.log("File deleted successfully");
        refetch();
        setAlert({
          message: "File deleted successfully!",
          type: "success",
          show: true,
        });
        setLoadingFileId(null);
      },
      onError: (error) => {
        console.error("Error deleting file:", error);
        setAlert({
          message: "Error deleting file!",
          type: "error",
          show: true,
        });
        setLoadingFileId(null);
      },
    }
  );

  const handleRowClick = (file) => {
    if (file.type === "folder" && file.child && file.child.length > 0) {
      toggleFolder(file);
    } else {
      setSelectedFileId(file.id);
    }
  };

  const closeModal = () => {
    setSelectedFileId(null);
  };

  const handleDownload = (file, e) => {
    e.stopPropagation();
    console.log("Downloading:", file);
    setActiveDropdown(false);
  };

  const handleTrash = (file, e) => {
    e.stopPropagation();
    setFileToDelete(file);
    setShowDeleteDialog(true);
    setActiveDropdown(false);
  };

  const confirmDelete = () => {
    if (deleteInput === "Delete Me" && fileToDelete) {
      deleteFileMutation.mutate(fileToDelete);
      setShowDeleteDialog(false);
      setDeleteInput("");
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
          <TableCell className="px-4 py-2 text-left text-xs w-[100px]">
            <div>{file.type}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-left text-xs w-[100px]">
            <div>{file.size}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-right relative">
            <div className="relative">
              <button
                className="border border-gray-300 dark:text-white text-xs px-3 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(index);
                }}
              >
                Actions
              </button>
              {activeDropdown === index && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-200 border rounded-lg shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-dark-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFileId(file.id);
                      toggleDropdown(index);
                    }}
                  >
                    Details
                  </button>
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
                    disabled={loadingFileId === file.id}
                  >
                    {loadingFileId === file.id ? (
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
            <th className="px-4 py-2 text-xs"></th>
            <th className="px-4 py-2 text-xs">Name</th>
            <th className="px-4 py-2 text-xs text-left w-[100px]">File Type</th>
            <th className="px-4 py-2 text-xs text-left w-[100px]">Size</th>
            <th className="px-4 py-2 text-xs"></th>
          </tr>
        </thead>
        <tbody>{renderFiles(files)}</tbody>
      </table>
      {selectedFileId && (
        <FileDetailsModal
          file={fileDetails}
          onClose={closeModal}
          loading={isLoading}
          error={isError}
        />
      )}

      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
          duration={2000}
        />
      )}

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        className="w-full max-w-lg"
      >
        <div className="p-4">
          <h3 className="text-2xl font-semibold mb-4">Confirm Deletion</h3>
          <p className="mb-4">
            Type <strong className="text-richRed">Delete Me</strong> to confirm
            the deletion of the file.
          </p>
          <input
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Delete Me"
          />
          <div className="mt-4 flex gap-x-4 justify-end">
            <Button
              onClick={() => setShowDeleteDialog(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleteInput !== "Delete Me"}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
