const Files = ({ fileId, path }) => {
  const filesData = {
    statusCode: "200",
    data: {
      id: "14979091729",
      name: "Neha",
      type: "folder",
      size: "-",
      updatedAt: "-",
      child: [
        {
          id: "179637786257",
          name: "my-doc.png",
          type: "IMG",
          size: "3.00 KB",
          updatedAt: "2024-09-27T13:03:50.098Z",
          child: [],
        },
        {
          id: "179637786424",
          name: "my-doc-1.png",
          type: "IMG",
          size: "3.00 KB",
          updatedAt: "2024-09-27T13:04:31.145Z",
          child: [],
        },
        {
          id: "179637786425",
          name: "my-document.pdf",
          type: "PDF",
          size: "1.50 MB",
          updatedAt: "2024-09-27T14:00:00.000Z",
          child: [],
        },
        {
          id: "179637786426",
          name: "my-spreadsheet.xlsx",
          type: "Excel",
          size: "500.00 KB",
          updatedAt: "2024-09-27T14:15:00.000Z",
          child: [],
        },
        {
          id: "179637786427",
          name: "my-presentation.pptx",
          type: "PPT",
          size: "2.00 MB",
          updatedAt: "2024-09-27T14:30:00.000Z",
          child: [],
        },
        {
          id: "179637786428",
          name: "images-folder",
          type: "folder",
          size: "-",
          updatedAt: "2024-09-27T14:45:00.000Z",
          child: [
            {
              id: "179637786429",
              name: "image1.jpg",
              type: "IMG",
              size: "500.00 KB",
              updatedAt: "2024-09-27T14:50:00.000Z",
              child: [],
            },
            {
              id: "179637786430",
              name: "image2.jpg",
              type: "IMG",
              size: "450.00 KB",
              updatedAt: "2024-09-27T14:55:00.000Z",
              child: [],
            },
          ],
        },
        {
          id: "179637786431",
          name: "reports-folder",
          type: "folder",
          size: "-",
          updatedAt: "2024-09-27T15:00:00.000Z",
          child: [
            {
              id: "179637786432",
              name: "report-2023.pdf",
              type: "PDF",
              size: "1.20 MB",
              updatedAt: "2024-09-27T15:05:00.000Z",
            },
            {
              id: "179637786433",
              name: "report-2022.pdf",
              type: "PDF",
              size: "1.00 MB",
              updatedAt: "2024-09-27T15:10:00.000Z",
              child: [],
            },
          ],
        },
      ],
    },
    statusMsg: "Record(s) has been successfully retrieved.",
  };

  const [currentFiles, setCurrentFiles] = useState(filesData.data);
  const [folderStack, setFolderStack] = useState([filesData.data]); // Set initial folder in breadcrumb
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [rightClickedFolder, setRightClickedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalFiles = currentFiles.child.length;
  const numOfPages = Math.ceil(totalFiles / itemsPerPage);

  const paginatedFiles = currentFiles.child.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Removed filesData from the dependency array to avoid re-triggering useEffect
  useEffect(() => {
    setCurrentFiles(filesData.data);
  }, []);

  const toggleFolder = (folder) => {
    if (folder.child && folder.child.length > 0) {
      setFolderStack([...folderStack, folder]); // Add the folder to the breadcrumb stack
      setCurrentFiles(folder);
      setCurrentPage(1); // Reset pagination to the first page when switching folders
    } else {
      console.error("No children to display in this folder.");
    }
  };

  const handleBreadcrumbClick = (index) => {
    const newStack = folderStack.slice(0, index + 1);
    const folder = newStack[index];

    setFolderStack(newStack); // Update the folder stack to reflect the clicked breadcrumb
    setCurrentFiles(folder); // Display the clicked folder's content
    setCurrentPage(1); // Reset pagination
  };

  const createFolder = () => {
    if (newFolderName) {
      const newFolder = { name: newFolderName, type: "folder", child: [] };
      if (rightClickedFolder) {
        rightClickedFolder.child.push(newFolder);
      } else {
        currentFiles.push(newFolder);
      }
      setCurrentFiles([...currentFiles]);
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
            onClick={handleBreadcrumbClick} // Update breadcrumb click handler
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
          files={paginatedFiles}
          toggleFolder={toggleFolder}
          dropdownVisible={dropdownVisible}
          setDropdownVisible={setDropdownVisible}
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
        <FileUpload />
      </Dialog>
    </div>
  );
};
