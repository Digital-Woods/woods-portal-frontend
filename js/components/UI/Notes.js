let IMAGE_URL = "";

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
);

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64data = reader.result.split(",")[1]; // Get base64 part
            const payload = {
              fileName: file.name,
              fileData: base64data,
            };
            const token = getAuthToken();

            fetch(IMAGE_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Send as JSON
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload), // Convert payload to JSON string
            })
              .then((response) => response.json())
              .then((result) => {
                resolve({ default: result.data.url });
              })
              .catch((error) => {
                reject(error);
              });
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(file); // Convert file to Base64
        })
    );
  }

  abort() { }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}


const CKEditorComponent = ({ initialData }) => {
  const editorRef = useRef(null); // To store the editor instance
  const editorContainerRef = useRef(null); // Ref to the container div

  useEffect(() => {
    // Initialize the CKEditor instance
    ClassicEditor.create(editorContainerRef.current, {
      extraPlugins: [MyCustomUploadAdapterPlugin],
      toolbar: ["heading", "|", "bold", "italic", "|", "uploadImage"],
      placeholder: "Add new note...",
    })
      .then((editor) => {
        editorRef.current = editor;
        // Preload initial data into the editor
        if (initialData) {
          editor.setData(initialData);
        }
      })
      .catch((error) => {
        console.error('Error initializing CKEditor:', error);
      });

    // Cleanup the CKEditor instance on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
          .then(() => {
            console.log('CKEditor destroyed successfully.');
            editorRef.current = null;
          })
          .catch((error) => {
            console.error('Error destroying CKEditor:', error);
          });
      }
    };
  }, []);

  return (
    <div id="editor" ref={editorContainerRef}></div>
  );
};



const NoteCard = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const editorRef = useRef(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
  );
  const OpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
  );

  const openEditor = () => {

  }

  return (
    <div key={note.hs_object_id} className="mt-5">
      <div className="border border-gray-200 shadow-md rounded-md mt-1 p-2 text-sm cursor-pointer" onClick={() => {
        setIsOpen(!isOpen);
        setIsOpenEditor(false)
      }
      }>
        <div >
          <div className="flex items-center">
            <div>
              {isOpen ?
                <OpenIcon />
                :
                <CloseIcon />
              }
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-semibold whitespace-nowrap">
                Note
              </p>
              <div>
                <p className="text-gray-400 text-xs">
                  <span className="mr-1"> {formatDate(note.hs_createdate)} </span>
                  {formatTime(note.hs_createdate)}
                </p>
              </div>
            </div>
          </div>
          {!isOpenEditor ?
            <div className={`p-[24px] ${!isOpen ? '' : 'border border-[#fff] hover:border-blue-500 hover:bg-gray-100 rounded-md relative group cursor-text'}`}
              onClick={(e) => {

                if (isOpen) {
                  e.stopPropagation();
                  setIsOpenEditor(true);
                  openEditor()
                }
              }}
            >
              <div className={!isOpen ? 'relative line-clamp-1' : ''}>
                <span>
                  {ReactHtmlParser.default(DOMPurify.sanitize(note.hs_note_body))}
                </span>
                <div
                  size="32"
                  opacity="1"
                  className={!isOpen ? 'text-shadow' : ''}
                ></div>
              </div>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <EditIcon />
              </div>
            </div>
            :
            <div className="p-[24px] cursor-text"
              onClick={(e) => e.stopPropagation()}
            >
              <CKEditorComponent initialData={note.hs_note_body} />
              <div className="mt-4 text-start">
                <Button
                  className="text-white mr-2"
                  size="sm"
                >
                  Save
                </Button>
                <Button
                  className="text-white"
                  size="sm"
                  onClick={() => {
                    setIsOpenEditor(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const Notes = ({ fileId, path }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { me } = useMe();
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(null);
  const limit = 5;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["data", fileId, page],
    queryFn: async () =>
      await Client.notes.all({
        me: me,
        fileId: fileId,
        path: path,
        limit: limit,
        page: page,
      }),
    // queryFn: async () => {
    //   return await Client.notes.all(me, fileId, path, limit, page);
    // },
  });
  const createNoteMutation = useMutation(
    async (newNote) => {
      return await Client.notes.createnote(me, fileId, path, newNote);
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["data", fileId]);
        refetch();
        setShowDialog(false);
        setAlert({
          message: "Note uploaded successfully!",
          type: "success",
        });
      },
      onError: (error) => {
        console.error("Error creating note:", error);
        setAlert({
          message: "Failed to upload the note.",
          type: "error",
        });
      },
    }
  );
  const { isLoading: isPosting } = createNoteMutation;
  const handleSaveNote = () => {
    const payload = {
      noteBody: editorContent,
    };
    createNoteMutation.mutate(payload);
  };
  useEffect(() => {
    // IMAGE_URL = `${env.API_BASE_URL}${API_ENDPOINTS.IMAGE_UPLOAD}/${me.hubspotPortals.templateName}${path}/${fileId}`;
    IMAGE_URL = ``;
    // test_payload = "test_payload";
    if (showDialog && editorRef.current) {
      window.ClassicEditor.create(editorRef.current, {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        toolbar: ["heading", "|", "bold", "italic", "|", "uploadImage"],
        placeholder: "Add new note...",
      })
        .then((editor) => {
          editor.ui.view.editable.element.style.minHeight = "200px";
          editor.model.document.on("change:data", () => {
            setEditorContent(editor.getData());
          });
        })
        .catch((error) => {
          console.error(error);
        });
      return () => {
        if (editorRef.current && editorRef.current.editor) {
          editorRef.current.editor.destroy();
        }
      };
    }
  }, [showDialog]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching notes: {error.message}</div>;
  }
  const results = data && data.data && data.data.results;
  const totalNotes = data && data.data && data.data.total;
  const numOfPages = Math.ceil(totalNotes / limit);
  return (
    <div className="rounded-lg mt-2 bg-cleanWhite p-4">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="flex justify-end mt-2 mb-6 items-center">
        {/* <CustomCheckbox buttonText="Sites" spanText="3" showSpan={true} /> */}
        <Button className="text-white" onClick={() => setShowDialog(true)}>
          <span className="mr-2"> + </span> New Note
        </Button>
      </div>
      {results && results.rows.length > 0 ? (
        results.rows.map((note) => (
          <NoteCard note={note} />
        ))
      ) : (
        <div>No notes available.</div>
      )}
      {totalNotes > limit && (
        <Pagination
          numOfPages={numOfPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      )}
      <Dialog
        open={showDialog}
        onClose={() => { }}
        // onClose={setShowDialog}
        className=" relative mx-auto bg-white overflow-y-auto"
      >
        <div
          className="absolute right-3 top-2 cursor-pointer"
          onClick={() => setShowDialog(false)}
        >
          <CloseIcon />
        </div>
        <div className="flex items-center mb-3">
          <p className="text-gray-600 text-xs">For</p>
          <p className="border rounded-full px-2 py-1 text-xs ml-2">
            {me.firstName}
          </p>
        </div>
        <div ref={editorRef} className="editor-container"></div>
        <div className="mt-4 text-start">
          <Button
            disabled={isPosting || editorContent.trim() === ""}
            onClick={handleSaveNote}
            className="text-white"
          >
            {isPosting ? "Saving Post..." : "Save Post"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
