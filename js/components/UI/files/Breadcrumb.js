const Breadcrumb = ({ folderStack, onClick }) => (
  <nav className="text-xs">
    <ol className="flex space-x-2">
      {folderStack && folderStack.length > 0 ? (
        folderStack.map((folder, index) => {
          if (folder && folder.name) {
            return (
              <li key={index} className="flex items-center">
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => onClick(index)}
                >
                  {folder.name}
                </span>
                {index < folderStack.length - 1 && (
                  <span className="mx-1"> / </span>
                )}
              </li>
            );
          } else {
            return (
              <li key={index} className="flex items-center">
                <span className="text-gray-500 cursor-default">
                  Unnamed Folder
                </span>
                {index < folderStack.length - 1 && (
                  <span className="mx-1"> / </span>
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
