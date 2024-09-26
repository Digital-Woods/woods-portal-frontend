const Notes = () => {
  const [showDialog, setShowDialog] = useState(false);

  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);

  const handleSaveNote = () => {
    console.log(editorContent);
    setShowDialog(false);
  };

  useEffect(() => {
    if (showDialog && editorRef.current) {
      window.ClassicEditor.create(editorRef.current, {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "insertTable",
          "|",
          "undo",
          "redo",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
          ],
        },
        placeholder: "Add new note...",
      })
        .then((editor) => {
          editor.ui.view.editable.element.style.minHeight = "200px";

          editor.model.document.on("change:data", () => {
            setEditorContent(editor.getData());
          });

          editor.model.document.selection.on("change:range", () => {
            const selectedElement =
              editor.model.document.selection.getSelectedElement();
            if (selectedElement) {
              const currentBlockType = selectedElement.name;
              console.log("Current Block Type: ", currentBlockType);
            } else {
              const block =
                editor.model.document.selection
                  .getFirstPosition()
                  .findAncestor("paragraph") ||
                editor.model.document.selection
                  .getFirstPosition()
                  .findAncestor("heading");
              if (block) {
                const currentBlockType = block.name; // Either 'paragraph', 'heading1', etc.
                console.log("Current Block Type: ", currentBlockType);
                // Reflect this in your UI if necessary.
              }
            }
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

  const notesData = [
    {
      id: 1,
      date: "December 14, 2021",
      day: "Tuesday",
      author: "Cane Doe",
      time: "3:45pm",
      content: "lorem ipsum 23 dkna..",
      associations: "2 associations",
    },
    {
      id: 2,
      date: "January 5, 2022",
      day: "Wednesday",
      author: "John Smith",
      time: "11:30am",
      content: "Sample note content here.",
      associations: "3 associations",
    },
    {
      id: 3,
      date: "January 5, 2022",
      day: "Wednesday",
      author: "John Smith",
      time: "11:30am",
      content: "Sample note content here.",
      associations: "3 associations",
    },
    {
      id: 4,
      date: "January 5, 2022",
      day: "Wednesday",
      author: "John Smith",
      time: "11:30am",
      content: "Sample note content here.",
      associations: "3 associations",
    },
  ];

  return (
    <div className=" rounded-lg  mt-2 bg-cleanWhite p-4">
      <div className="flex justify-between mt-2 mb-6 items-center">
        <CustomCheckbox buttonText="Sites" spanText="3" showSpan={true} />
        <Button className="text-white" onClick={() => setShowDialog(true)}>
          <span className="mr-2"> + </span> New Note
        </Button>
      </div>

      {notesData.map((note) => (
        <div>
          <div className="mt-5">
            <p className="text-xs font-semibold">
              {note.date}{" "}
              <span className="text-gray-400 font-normal ml-1">{note.day}</span>
            </p>
          </div>
          <div
            key={note.id}
            className="border border-gray-200 shadow-md rounded-md mt-1 p-2"
          >
            <div className="flex justify-between items-center">
              <div className="w-[40px] flex gap-x-2 items-center">
                <img
                  src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                  alt="Profile"
                  className="rounded-full"
                />
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  {note.author}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">{note.time}</p>
              </div>
            </div>

            <div>
              <p className="text-xs my-2 px-2">{note.content}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="rounded-lg bg-gray-200 px-2 py-1 w-fit">
                <p className="text-xs text-gray-500">{note.associations}</p>
              </div>

              <div className="flex gap-x-2">
                <PinIcon />
                <CopyIcon />
                <DeleteIcon />
                <ThreeDotIcon />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Dialog
        open={showDialog}
        onClose={setShowDialog}
        className="  mx-auto bg-white overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600 text-xs ">For</p>

          <Button variant="ghost" size="sm">
            {" "}
            Add Association{" "}
          </Button>
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
