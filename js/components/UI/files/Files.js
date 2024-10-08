const Files = ({ fileId, path }) => {
  const [currentFiles, setCurrentFiles] = useState({ child: [] });
  const [folderStack, setFolderStack] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [rightClickedFolder, setRightClickedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { me } = useMe();

  const [alert, setAlert] = useState({ message: "", type: "", show: false });

  const handleCloseAlert = () => {
    setAlert({ message: "", type: "", show: false });
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["FilesData", fileId],
    queryFn: async () => {
      if (me && me.hubspotPortals && fileId && path) {
        console.log(
          "Fetching files with:",
          me.hubspotPortals.templateName,
          fileId,
          path
        );
        return await Client.files.all(me, fileId, path);
      } else {
        throw new Error("Missing data for fetching files");
      }
    },
  });

  useEffect(() => {
    if (data && data.data) {
      setCurrentFiles(data.data);
      setFolderStack([data.data]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading files.</div>;
  }

  // Filter files based on search term
  const filteredFiles = currentFiles.child.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFiles = filteredFiles.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

  const numOfPages = Math.ceil(totalFiles / itemsPerPage);

  const toggleFolder = (folder) => {
    setFolderStack([...folderStack, folder]);
    setCurrentFiles(folder);
    setCurrentPage(1);
  };

  const handleBreadcrumbClick = (index) => {
    if (folderStack && folderStack.length > index) {
      const newStack = folderStack.slice(0, index + 1);
      const folder = newStack[index];
      setFolderStack(newStack);
      setCurrentFiles(folder);
      setCurrentPage(1);
    }
  };

  const createFolder = (folderName) => {
    const newFolder = {
      id: Date.now().toString(),
      name: folderName,
      type: "folder",
      child: [],
    };
    if (rightClickedFolder && rightClickedFolder.child) {
      rightClickedFolder.child.push(newFolder);
    } else if (currentFiles && currentFiles.child) {
      currentFiles.child.push(newFolder);
    }
    setCurrentFiles({ ...currentFiles });
    setNewFolderName("");
    setIsCreateFolderOpen(false);
  };

  const closeContextMenu = () => {
    document.getElementById("contextMenu");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "dialog-overlay") {
      // Only close if clicked on the overlay
      closeDialog();
    }
  };

  const getCurrentFolderId = () => {
    return (currentFiles && currentFiles.id) || "obj-root";
  };

  return (
    <div onClick={closeContextMenu}>
      <div className="rounded-lg mt-2 bg-cleanWhite dark:bg-dark-300 p-4">
        <div className="flex justify-between mb-6 items-center mt-2">
          <Input
            placeholder="Search..."
            height="semiMedium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <Breadcrumb
            folderStack={folderStack}
            onClick={handleBreadcrumbClick}
          />
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="text-white w-28"
              onClick={() => setIsCreateFolderOpen(true)}
            >
              <span className="mr-2"> + </span> New Folder
            </Button>
            <Button
              size="sm"
              className="text-white w-28"
              onClick={() => setIsDialogOpen(true)}
            >
              <span className="mr-2"> + </span> New File
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-4 dark:text-white">
          {currentFiles && currentFiles.name ? currentFiles.name : "Root"}
        </h1>

        {/* <FileTable
          fileId={fileId}
          path={path}
          files={paginatedFiles} // Use paginatedFiles which is based on filteredFiles
          toggleFolder={toggleFolder}
          refetch={refetch}
        /> */}
        <ModuleFileTable/>

        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-x-2 pt-3 text-sm">
            <p className="text-secondary leading-5 text-sm dark:text-gray-300">
              Showing
            </p>
            <span className="border border-2 dark:text-white border-black font-medium w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
              {Math.min(endIndex, totalFiles)}
            </span>
            <span className="dark:text-white">/</span>
            <span className="rounded-md dark:text-white font-medium">
              {totalFiles}
            </span>
            <p className="text-secondary dark:text-white font-normal text-sm dark:text-gray-300">
              Results
            </p>
          </div>

          <Pagination
            numOfPages={numOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <FolderUpload
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreate={createFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        folderId={getCurrentFolderId()}
        fileId={fileId}
        path={path}
        refetch={refetch}
        setAlert={setAlert}
      />
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
          duration={3000}
        />
      )}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <div id="dialog-overlay" onClick={handleOverlayClick}>
          <FileUpload
            folderId={getCurrentFolderId()}
            fileId={fileId}
            path={path}
            refetch={refetch}
            onClose={closeDialog}
            setAlert={setAlert}
          />
        </div>
      </Dialog>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
          duration={3000}
        />
      )}
    </div>
  );
};
