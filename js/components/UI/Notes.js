let IMAGE_URL = "";

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

            fetch(IMAGE_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Send as JSON
              },
              body: JSON.stringify(payload), // Convert payload to JSON string
            })
              .then((response) => response.json())
              .then((result) => {
                resolve({ default: result.url });
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

  abort() {}
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
const Notes = ({ fileId, path }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { me } = useMe();
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["data", fileId, page],
    queryFn: async () => {
      return await Client.notes.all(me, fileId, path, limit, page);
    },
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
      },
      onError: (error) => {
        console.error("Error creating note:", error);
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
    IMAGE_URL = `${API_ENDPOINTS.ALL_NOTES}/${me.hubspotPortals.templateName}${path}/${fileId}`;
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
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
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
      <div className="flex justify-end mt-2 mb-6 items-center">
        {/* <CustomCheckbox buttonText="Sites" spanText="3" showSpan={true} /> */}
        <Button className="text-white" onClick={() => setShowDialog(true)}>
          <span className="mr-2"> + </span> New Note
        </Button>
      </div>
      {results && results.length > 0 ? (
        results.map((note) => (
          <div key={note.id} className="mt-5">
            {/* <p className="text-xs font-semibold">
              {formatDate(note.createdAt)}
            </p> */}
            <div className="border border-gray-200 shadow-md rounded-md mt-1 p-2 text-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="w-[40px] flex gap-x-2 items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      className="fill-primary dark:fill-white"
                    >
                      <path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    Note
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">
                    <span className="mr-1"> {formatDate(note.createdAt)} </span>
                    {formatTime(note.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                {ReactHtmlParser.default(DOMPurify.sanitize(note.noteBody))}
              </div>
              {/* <div className="flex justify-end items-center">
                <div className="flex gap-x-2">
                  <PinIcon />
                  <CopyIcon />
                  <DeleteIcon />
                  <ThreeDotIcon />
                </div>
              </div> */}
            </div>
          </div>
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
        onClose={setShowDialog}
        className="mx-auto bg-white overflow-y-auto"
      >
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
