const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [files, setFiles] = useState([]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const inputChange = (e) => {
    let validFilesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      // You can add additional validation for file extensions if needed
      validFilesArray.push(file);

      // FileReader to preview the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile((prevValue) => [
          ...prevValue,
          {
            id: generateUniqueId(),
            filename: file.name,
            filetype: file.type,
            fileimage: reader.result, // File preview (base64)
          },
        ]);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }

    if (validFilesArray.length > 0) {
      e.target.value = ""; // Reset input after valid file selection
    }
  };

  const deleteSelectFile = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      const result = selectedFile.filter((data) => data.id !== id);
      setSelectedFile(result);
    }
  };

  const fileUploadSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (selectedFile.length > 0) {
      setFiles((prevValue) => [...prevValue, ...selectedFile]);
      setSelectedFile([]);
    } else {
      alert("Please select a file");
    }
  };

  const deleteFile = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      const result = files.filter((data) => data.id !== id);
      setFiles(result);
    }
  };

  return (
    <div className="fileupload-view">
      <div className="row justify-content-center m-0">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <div className="kb-data-box">
                <div className="kb-modal-data-title">
                  <div className="kb-data-title">
                    <h6>File Upload</h6>
                  </div>
                </div>
                <form onSubmit={fileUploadSubmit}>
                  <div className="kb-file-upload">
                    <div className="file-upload-box">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="40px"
                          viewBox="0 -960 960 960"
                          width="40px"
                          className="fill-black dark:fill-white my-3"
                        >
                          <path d="M260-200q-74.85 0-127.42-52.06Q80-304.11 80-379.31q0-71.07 48.92-123.23 48.93-52.15 114.93-56.08Q257.31-646 324.23-703q66.92-57 155.77-57 100.29 0 170.14 69.86Q720-620.29 720-520v40h24.62q57.46 1.85 96.42 42.19Q880-397.46 880-340q0 58.85-39.81 99.42Q800.38-200 741.54-200H524.62q-27.62 0-46.12-18.5Q460-237 460-264.62v-232.15l-84 83.54-28.31-27.54L480-573.08l132.31 132.31L584-413.23l-84-83.54v232.15q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69H740q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-21.54q-55.69 0-97.08 41Q120-438 120-380t41 99q41 41 99 41h100v40H260Zm220-260Z" />
                        </svg>
                      </div>
                      <input
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={inputChange}
                        multiple
                      />
                      <p> Drag and drop </p>
                      <p> or </p>
                      <p className="border-2 border-black text-black p-2  rounded-lg !mt-3 font-semibold">
                        Browse
                      </p>
                    </div>
                  </div>
                  <div className="kb-attach-box mb-3  max-h-[100px] overflow-y-scroll scrollbar">
                    {selectedFile.map((data) => {
                      const { id, filename } = data;
                      return (
                        <div
                          className="file-atc-box border border-gray-300 rounded-lg shadow-md p-2 mb-2 "
                          key={id}
                        >
                          <div className="file-detail flex items-center">
                            <div className="">{getIcon(filename)}</div>
                            <div className="ml-2 text-sm font-medium">
                              {filename}
                            </div>
                            <div className="file-actions ml-auto">
                              <button
                                type="button"
                                className="file-action-btn text-red-600"
                                onClick={() => deleteSelectFile(id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button type="submit">Upload</Button>
                </form>

                {files.length > 0 && (
                  <div className="kb-attach-box">
                    <hr />
                    {files.map((data) => {
                      const { id, filename } = data;
                      return (
                        <div className="file-atc-box" key={id}>
                          <div className="file-detail flex items-center">
                            {getIcon(filename)}
                            <h6 className="ml-2 ">{filename}</h6>
                            <div className="file-actions ml-auto">
                              <a
                                href={data.fileimage}
                                className="file-action-btn"
                                download={filename}
                              >
                                Download
                              </a>
                              <button
                                className="file-action-btn ml-3"
                                onClick={() => deleteFile(id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
