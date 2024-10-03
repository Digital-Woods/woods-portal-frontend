const FolderUpload = ({ isOpen, onClose, refetch, folderId, fileId, path }) => {
  const { me } = useMe();
  const [newFolderName, setNewFolderName] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "", show: false });

  const createFolderMutation = useMutation({
    mutationFn: async (payload) => {
      await Client.files.createAfolder(me, fileId, path, payload);
    },
    onSuccess: () => {
      setAlert({
        message: "Folder created successfully!",
        type: "success",
        show: true,
      });
      refetch();
      setNewFolderName("");
    },
    onError: (error) => {
      console.error("Error creating folder:", error);
      setAlert({
        message: "Error creating folder!",
        type: "error",
        show: true,
      });
    },
  });

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") {
      setAlert({
        message: "Folder name cannot be empty!",
        type: "error",
        show: true,
      });
      return;
    }

    const parentFolder = fileId === folderId ? "obj-root" : folderId;
    const payload = {
      parentFolder,
      folderName: newFolderName,
    };

    createFolderMutation.mutate(payload);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center">
        <div className="bg-cleanWhite dark:bg-dark-200 p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            New Folder
          </h2>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)} // Update folder name on change
            className="border border-gray-300 dark:bg-dark-100 p-2 w-full rounded"
            placeholder="Folder Name"
          />
          <div className="mt-4 flex gap-x-5 justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={createFolderMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              disabled={
                createFolderMutation.isLoading || newFolderName.trim() === ""
              }
            >
              {createFolderMutation.isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
          {alert.show && (
            <div
              className={`mt-2 text-${
                alert.type === "error" ? "red" : "green"
              }-500`}
            >
              {alert.message}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
