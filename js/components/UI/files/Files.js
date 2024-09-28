const Files = ({ fileId, path }) => {
  const [currentFiles, setCurrentFiles] = useState({ child: [] }); // Initialize as an object with child
  const [folderStack, setFolderStack] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [rightClickedFolder, setRightClickedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { me } = useMe();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["FilesData", fileId],
    queryFn: async () => {
      console.log(
        "Fetching files with:",
        me.hubspotPortals.templateName,
        fileId,
        path
      );
      return await Client.files.all(me, fileId, path);
    },
  });

  useEffect(() => {
    if (data) {
      setCurrentFiles(data.data); // Set currentFiles to the fetched data
      setFolderStack([data.data]); // Initialize folderStack with the root folder
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error loading files.</div>; // Handle error state
  }

  const totalFiles = currentFiles.child.length;
  const numOfPages = Math.ceil(totalFiles / itemsPerPage);

  const paginatedFiles = currentFiles.child.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFolder = (folder) => {
    if (folder.child && folder.child.length > 0) {
      setFolderStack([...folderStack, folder]);
      setCurrentFiles(folder);
      setCurrentPage(1);
    } else {
      console.error("No children to display in this folder.");
    }
  };

  const handleBreadcrumbClick = (index) => {
    const newStack = folderStack.slice(0, index + 1);
    const folder = newStack[index];

    setFolderStack(newStack);
    setCurrentFiles(folder);
    setCurrentPage(1);
  };

  const createFolder = () => {
    if (newFolderName) {
      const newFolder = {
        id: Date.now().toString(),
        name: newFolderName,
        type: "folder",
        child: [],
      };
      if (rightClickedFolder) {
        rightClickedFolder.child.push(newFolder);
      } else {
        currentFiles.child.push(newFolder);
      }
      setCurrentFiles({ ...currentFiles });
      setNewFolderName("");
      setIsCreateFolderOpen(false);
    }
  };

  const closeContextMenu = () => {
    document.getElementById("contextMenu").style.display = "none";
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div onClick={closeContextMenu}>
      <div className="rounded-lg mt-2 bg-cleanWhite dark:bg-dark-300 p-4">
        <div className="flex justify-between mb-6 items-center mt-2">
          <Input placeholder="Search..." height="semiMedium" />
        </div>

        <div className="flex justify-between items-center">
          <Breadcrumb
            folderStack={folderStack}
            onClick={handleBreadcrumbClick}
          />
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="text-white"
              onClick={() => setIsCreateFolderOpen(true)}
            >
              <span className="mr-2"> + </span> New Folder
            </Button>
            <Button
              size="sm"
              className="text-white"
              onClick={() => setIsDialogOpen(true)}
            >
              <span className="mr-2"> + </span> New Document
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-4 dark:text-white">
          {currentFiles.name || "Root"}
        </h1>

        <FileTable
          fileId={fileId}
          path={path}
          files={paginatedFiles}
          toggleFolder={toggleFolder}
          refetch={refetch}
        />

        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-x-2 pt-3 text-sm">
            <p className="text-secondary leading-5 text-sm dark:text-gray-300">
              Showing
            </p>
            <span className="border border-2 dark:text-white border-black font-medium w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
              {currentFiles.child.length}
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

      <Dialog
        open={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
      >
        <div className="flex items-center justify-center">
          <div className="bg-cleanWhite dark:bg-dark-200">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              New Folder
            </h2>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="border border-gray-300 dark:bg-dark-100 p-2 w-full rounded"
              placeholder="Folder Name"
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setIsCreateFolderOpen(false)}>
                Cancel
              </Button>
              <Button variant="sm" onClick={createFolder}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <FileUpload fileId={fileId} path={path} />
      </Dialog>
    </div>
  );
};
