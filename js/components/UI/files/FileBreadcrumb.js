const FileBreadcrumb = ({ id, folderStack, onClick }) => (

  <nav className="text-xs">
    <ol className="flex flex-wrap">
      {folderStack && folderStack.length > 0 ? (
        folderStack.map((folder, index) => {
          if (folder && folder.name) {
            return (
              <li key={index} className="flex items-center">
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => onClick(index)}
                >
                  {folder.name != id ? folder.name : 'Home'}
                </span>
                {index < folderStack.length - 1 && (
                  <span className="mx-1">/</span>
                )}
              </li>
            );
          } else {
            return (
              <li key={index} className="flex items-center">
                <span className="text-gray-500 cursor-default">No Folder</span>
                {index < folderStack.length - 1 && (
                  <span className="mx-1">/</span>
                )}
              </li>
            );
          }
        })
      ) : (
        <li className="text-gray-500">Root</li>
      )}
    </ol>
  </nav>

);
