let IMAGE_UPLOAD_URL = ''
class CustomUploadAdapter {
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
  
              fetch(IMAGE_UPLOAD_URL, {
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

// A custom plugin to register the custom upload adapter.
function CustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new CustomUploadAdapter( loader );
    };
}


const CKEditor = ({ initialData = "", setEditorContent, id = 'new', api }) => {
    IMAGE_UPLOAD_URL = api
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
                      ImageUpload
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
                          CustomUploadAdapterPlugin
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
                        }
                      })
                      .then(editor => {
                          window.editor = editor;
                          if (${initialData ? `'${initialData}'` : 'null'}) {
                            editor.setData(${initialData ? `'${initialData}'` : 'null'});
                          }
                          editor.model.document.on("change:data", () => {
                            const data = editor.getData();
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
