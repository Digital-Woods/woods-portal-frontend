const Notes = ({ fileId, path }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { me } = useMe();
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);

  const handleSaveNote = () => {
    console.log(editorContent);
    setShowDialog(false);
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["data", fileId],
    queryFn: async () => {
      console.log(
        "Fetching files with:",
        me.hubspotPortals.templateName,
        fileId,
        path
      );
      return await Client.notes.all(me, fileId, path);
    },
  });

  useEffect(() => {
    if (showDialog && editorRef.current) {
      window.ClassicEditor.create(editorRef.current, {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",

          "|",

          "blockQuote",
          "insertTable",
          "|",
          "undo",
          "redo",
        ],
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

  return (
    <div className="rounded-lg mt-2 bg-cleanWhite p-4">
      <div className="flex justify-between mt-2 mb-6 items-center">
        <CustomCheckbox buttonText="Sites" spanText="3" showSpan={true} />
        <Button className="text-white" onClick={() => setShowDialog(true)}>
          <span className="mr-2"> + </span> New Note
        </Button>
      </div>

      {results && results.length > 0 ? (
        results.map((note) => (
          <div key={note.id} className="mt-5">
            <p className="text-xs font-semibold">
              {formatDate(note.createdAt)}
            </p>
            <div className="border border-gray-200 shadow-md rounded-md mt-1 p-2">
              <div className="flex justify-between items-center">
                <div className="w-[40px] flex gap-x-2 items-center">
                  <img
                    src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                    alt="Profile"
                    className="rounded-full"
                  />
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    No name
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">
                    {formatTime(note.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs my-2 px-2">{note.noteBody}</p>
              </div>
              <div className="flex justify-end items-center">
                <div className="flex gap-x-2">
                  <PinIcon />
                  <CopyIcon />
                  <DeleteIcon />
                  <ThreeDotIcon />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No notes available.</div>
      )}

      <Dialog
        open={showDialog}
        onClose={setShowDialog}
        className="mx-auto bg-white overflow-y-auto"
      >
        <div className="flex  items-center mb-3">
          <p className="text-gray-600 text-xs ">For</p>
          <p className="border rounded-full px-2 py-1 text-xs ml-2">
            {me.firstName}
          </p>
        </div>

        <div ref={editorRef} className="editor-container "></div>

        <div className="mt-4 text-start">
          <Button onClick={handleSaveNote} className="text-white">
            Create Note
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
