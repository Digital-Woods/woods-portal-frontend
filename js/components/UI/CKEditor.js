const CKEditor = ({ initialData = "", setEditorContent, id = 'new', api }) => {
    const editorRef = useRef(id);
    
    useEffect(() => {
        // Dynamically load CKEditor
        const loadCkEditor = () => {
            const script = document.createElement('script');
            script.type = 'module';
            script.async = true;
            const onDataChange = (data) => {
                setEditorContent(data);
            };
            const token = getAuthToken();

            script.innerHTML = `
                  import {
                      ClassicEditor,
                      Essentials,
                      Paragraph,
                      Bold,
                      Italic,
                      Underline,
                      BlockQuote,
                      List,
                      Alignment,
                      RemoveFormat,
                      Link,
                      Font,
                      Image, 
                      ImageToolbar, 
                      ImageUpload, 
                      SimpleUploadAdapter
                  } from 'ckeditor5';
  
                  ClassicEditor
                      .create(document.querySelector('#${id}'), {
                        plugins: [
                          Essentials, 
                          Paragraph, 
                          Bold, 
                          Italic, 
                          Underline, 
                          BlockQuote, 
                          List, 
                          Alignment, 
                          RemoveFormat, 
                          Link, 
                          Font,
                          Image,
                          ImageToolbar,
                          ImageUpload,
                          SimpleUploadAdapter
                        ],
                        toolbar: [
                          "bold", "italic", "underline", "removeFormat", "|",
                          {
                            name: "moreFormatting",
                            items: [
                              "fontFamily", "fontSize", "fontColor", "fontBackgroundColor",
                              "blockquote", "bulletedList", "numberedList", "alignment"
                            ]
                          },
                          "|", 
                          "link", "uploadImage", "|"
                        ],
                        image: {
                          toolbar: [ 'imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side' ]
                        },
                        simpleUpload: {
                          uploadUrl: '${api}',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ${token}'
                          }
                        }
                      })
                      .then(editor => {
                          window.editor = editor;
                          if (${initialData ? `'${initialData}'` : 'null'}) {
                            editor.setData(${initialData ? `'${initialData}'` : 'null'});
                          }
                          editor.model.document.on("change:data", () => {
                            const data = editor.getData();
                            console.log(data);
                            window.onDataChange(data);
                          });
  
                          // Move toolbar to the bottom
                          const toolbarElement = editor.ui.view.toolbar.element;
                          const editableElement = editor.ui.view.editable.element;
                          editableElement.parentNode.insertBefore(toolbarElement, editableElement.nextSibling);
                      })
                      .catch(error => {
                          console.error(error);
                      });
              `;
            window.onDataChange = onDataChange;
            document.head.appendChild(script);
        };

        loadCkEditor(); // Invoke the dynamic loading of CKEditor when the component is mounted

        return () => {
            if (window.editor) {
                window.editor.destroy().catch((error) => console.error('Failed to destroy CKEditor:', error));
            }
        };
    }, []);

    return (
        <div id={id} ref={editorRef}>
        </div>
    );
};
