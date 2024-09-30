const Breadcrumb = ({ folderStack, onClick }) => (
  <nav className="text-xs">
    <ol className="flex space-x-2">
      {folderStack.map((folder, index) => (
        <li key={index} className="flex items-center">
          <span
            className="text-primary cursor-pointer"
            onClick={() => onClick(index)}
          >
            {folder.name}
          </span>
          {index < folderStack.length - 1 && <span className="mx-1"> / </span>}
        </li>
      ))}
    </ol>
  </nav>
);
