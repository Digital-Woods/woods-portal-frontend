const FileTable = ({
  files,
  toggleFolder,
  dropdownVisible,
  setDropdownVisible,
}) => {
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
                    setDropdownVisible(index);
                  }}
                >
                  Actions
                </button>
                {dropdownVisible === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-200 border rounded-lg shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-dark-300"
                      onClick={() => {
                        // Handle action
                      }}
                    >
                      Delete
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

  return (
    <div className="table-container">
      <table className="table-auto w-full mb-6">
        <thead className="bg-gray-100 dark:bg-dark-200">
          <tr>
            <th className="px-4 py-2 text-xs">Type</th>
            <th className="px-4 py-2 text-xs">Name</th>
            <th className="px-4 py-2 text-xs text-right">Type</th>
            <th className="px-4 py-2 text-xs text-right">Size</th>
            <th className="px-4 py-2 text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody>{renderFiles(files)}</tbody>
      </table>
    </div>
  );
};
