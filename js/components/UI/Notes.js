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

  const notesData = {
    statusCode: "200",
    data: {
      results: [
        {
          id: "61253019678",
          attachmentIds: [
            {
              value: "179733788972",
              label: "179733788972",
            },
            {
              value: "179729388294",
              label: "179729388294",
            },
            {
              value: "179733550194",
              label: "179733550194",
            },
          ],
          createdAt: 1727517542285,
          noteBody:
            '<div style="" dir="auto" data-top-level="true"><p style="margin:0;">Note 2</p><p style="margin:0;">From Student Neha</p></div>',
          bodyPreview: "Note 2 From Student Neha",
        },
        {
          id: "61241346891",
          attachmentIds: "",
          createdAt: 1727523724792,
          noteBody:
            "<h1>Helllo, <strong>This is bold, </strong><i><strong>italicsssss</strong></i></h1><p><i><strong>Noral dnlsm bold italic paragraph.&nbsp;</strong></i></p>",
          bodyPreview:
            "Helllo, This is bold, italicsssss Noral dnlsm bold italic paragraph. ",
        },
        {
          id: "61247596545",
          attachmentIds: [
            {
              value: "179788717082",
              label: "179788717082",
            },
          ],
          createdAt: 1727523831290,
          noteBody:
            '<div style="" dir="auto" data-top-level="true"><h1>Helllo, <strong>This is bold, </strong>italicsssss</h1><p style="margin:0;">Noral dnlsm bold italic paragraph.</p><br><p style="margin:0;">sasas</p><br><p style="margin:0;">Note By: Manab Roy</p><p style="margin:0;">Email: manabroy@gmail.com</p><br><div style=""><img src="https://api.hubspot.com/filemanager/api/v2/files/179712614418/signed-url-redirect?portalId=47146741" width="400" style=""></div><br><div style=""><img src="https://api.hubspot.com/filemanager/api/v2/files/179788716630/signed-url-redirect?portalId=47146741" width="400" style=""></div><br></div>',
          bodyPreview:
            "Helllo, This is bold, italicsssss Noral dnlsm bold italic paragraph. sasas Note By: Manab Roy Email: manabroy@gmail.com",
        },
      ],
      total: 4,
    },
    statusMsg: "Record(s) has been successfully retrieved.",
  };

  const renderHtml = (htmlString, containerRef) => {
    const tempDiv = document.createElement("div"); // Create a temporary div
    tempDiv.innerHTML = htmlString; // Parse the HTML string
    const childNodes = Array.from(tempDiv.childNodes); // Convert child nodes to array
    childNodes.forEach((node) => {
      containerRef.current.appendChild(node); // Append each node to the container
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp / 1000); // Convert from seconds to milliseconds
    return date.toLocaleDateString(); // Returns only the date
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp / 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Returns time without seconds
  };

  return (
    <div className=" rounded-lg  mt-2 bg-cleanWhite p-4">
      <div className="flex justify-between mt-2 mb-6 items-center">
        <CustomCheckbox buttonText="Sites" spanText="3" showSpan={true} />
        <Button className="text-white" onClick={() => setShowDialog(true)}>
          <span className="mr-2"> + </span> New Note
        </Button>
      </div>

      {notesData.data.results.map((note) => (
        <div>
          <div className="mt-5">
            <p className="text-xs font-semibold">
              {formatDate(note.createdAt)}

              {/* <span className="text-gray-400 font-normal ml-1">{note.day}</span> */}
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
