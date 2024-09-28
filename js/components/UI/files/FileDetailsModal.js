const FileDetailModal = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-200 p-4 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-2">{file.name}</h2>
        <p>
          <strong>Type:</strong> {file.type}
        </p>
        <p>
          <strong>Size:</strong> {file.size} bytes
        </p>
        <p>
          <strong>Extension:</strong> {file.extension}
        </p>
        <p>
          <strong>URL:</strong>{" "}
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.url}
          </a>
        </p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
