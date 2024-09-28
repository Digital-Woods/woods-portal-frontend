const Files = (fileId, path) => {
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
  const [folderStack, setFolderStack] = useState([]);
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

  useEffect(() => {
    if (filesData.data) {
      setCurrentFiles(filesData.data);
    }
  }, [filesData]);

  useEffect(() => {
    if (currentFiles && currentFiles.type === "folder") {
      if (currentFiles.child && currentFiles.child.length > 0) {
        console.log("Folder has children:", currentFiles.child);
        setCurrentFiles(currentFiles);
      } else {
        console.error("Folder has no children or is invalid.");
      }
    } else {
      console.error("Current file is not a folder.");
    }
  }, [currentFiles]);

  const toggleFolder = (folder) => {
    if (folder.child && folder.child.length > 0) {
      setCurrentFiles(folder);
      setCurrentPage(1);
    } else {
      console.error("No children to display in this folder.");
    }
  };

  const toggleDropdown = (index) => {
    setDropdownVisible((prevIndex) => (prevIndex === index ? null : index));
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
        <TableRow className="border-t relative">
          <TableCell className="px-4 py-2 text-xs">
            <div>{getIconType(file.type)}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-xs">
            <div className="dark:text-white">{file.name}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-xs text-right">
            <div>{file.type}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-xs text-right">
            <div>{file.size}</div>
          </TableCell>
          <TableCell className="px-4 py-2 text-right relative">
            {file.type === "folder" && file.child && file.child.length > 0 ? (
              <button
                className="border border-gray-200 dark:text-white text-xs px-3 py-1 rounded"
                onClick={() => toggleFolder(file)}
              >
                Open
              </button>
            ) : (
              <div className="relative">
                <button
                  className="border border-gray-200 dark:text-white text-xs px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling
                    toggleDropdown(index);
                  }}
                >
                  Actions
                </button>
                {dropdownVisible === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-200 border rounded-lg shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-xs dark:text-white hover:bg-gray-100 dark:hover:bg-dark-100"
                      onClick={(e) => {
                        console.log(`Download ${file.name}`);
                        e.stopPropagation(); // Prevent click from bubbling
                      }}
                    >
                      Download
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-gray-100 dark:hover:bg-dark-100"
                      onClick={(e) => {
                        console.log(`Trash ${file.name}`);
                        e.stopPropagation(); // Prevent click from bubbling
                      }}
                    >
                      Trash
                    </button>
                  </div>
                )}
              </div>
            )}
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };

  const closeContextMenu = () => {
    document.getElementById("contextMenu").style.display = "none";
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

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBreadcrumbClick = (index) => {
    const newStack = folderStack.slice(0, index + 1);
    const folder = newStack[index];

    if (folder && folder.child && folder.child.length > 0) {
      setFolderStack(newStack);
      setCurrentFiles(folder);
    } else {
      console.error("Folder has no children or is invalid.");
    }
  };

  return (
    <div onClick={closeContextMenu}>
      <div className="rounded-lg mt-2 bg-cleanWhite dark:bg-dark-300 p-4">
        <div className="flex justify-between mb-6 items-center mt-2">
          <Input placeholder="Search..." height="semiMedium" />
        </div>

        <div className="flex justify-between items-center">
          <nav className="text-xs">
            <ol className="flex space-x-2">
              {folderStack.map((folder, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className="text-primary cursor-pointer"
                    onClick={handleBreadcrumbClick}
                  >
                    {folder.name}
                  </span>
                  {index < folderStack.length - 1 && (
                    <span className="mx-1"> / </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
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
          {currentFiles.length > 0 ? currentFiles[0].name : "Root"}
        </h1>

        <Table className="w-full border rounded-lg overflow-hidden">
          <TableHeader className="bg-graySecondary dark:bg-dark-300">
            <TableRow>
              <TableHead className="py-2 text-left text-xs"></TableHead>
              <TableHead className="pr-4 py-2 text-left dark:text-white text-xs">
                Name
              </TableHead>
              <TableHead className="px-4 py-2 text-right dark:text-white text-xs">
                Type
              </TableHead>
              <TableHead className="px-4 py-2 text-right dark:text-white text-xs">
                Size
              </TableHead>
              <TableHead className="px-4 py-2 text-right text-xs"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>{renderFiles(paginatedFiles)}</TableBody>
        </Table>

        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-x-2 pt-3 text-sm">
            <p className="text-secondary leading-5 text-sm dark:text-gray-300">
              Showing
            </p>
            <span className="border border-2 dark:text-white border-black font-medium w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
              {currentFiles.length}
            </span>
            <span className="dark:text-white">/</span>
            <span className="rounded-md dark:text-white font-medium">6</span>
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

      <div
        id="contextMenu"
        className="hidden fixed bg-white dark:bg-dark-200 rounded shadow-md z-50"
      >
        <button
          className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300"
          onClick={() => {
            setIsCreateFolderOpen(true);
            closeContextMenu();
          }}
        >
          Create New Folder
        </button>
        <button
          className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300"
          onClick={() => {
            setIsDialogOpen(true);
            closeContextMenu();
          }}
        >
          File Upload
        </button>
      </div>

      <Dialog
        open={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        className=""
      >
        <div className="flex items-center justify-center ">
          <div className="bg-cleanWhite dark:bg-dark-200 ">
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

      <Dialog open={isDialogOpen} onClose={closeDialog} className="">
        <div className="">
          <FileUpload />
        </div>
      </Dialog>
    </div>
  );
};
