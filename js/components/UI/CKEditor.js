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
    const attachmentIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/></svg>`
    const customLinkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/></svg>`

    useEffect(() => {
        // Dynamically load CKEditor
        const loadCkEditor = () => {
            const script = document.createElement('script');
            script.type = 'module';
            script.async = true;
            const onDataChange = (data) => {
                setEditorContent(data);
            };

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
                        GeneralHtmlSupport,
                        Plugin,
                        ButtonView
                    } from 'ckeditor5';

                    // Custom Attachment Plugin
                    class AttachmentPlugin extends Plugin {
                        init() {
                            const editor = this.editor;

                            // Add the attachment button to the editor
                            editor.ui.componentFactory.add( 'attachment', locale => {
                                const view = new ButtonView( locale );

                                view.set( {
                                    label: 'Attachment',
                                    icon: '${attachmentIcon}',
                                    tooltip: true
                                } );

                                // Handle the button click event
                                view.on( 'execute', () => {
                                    const input = document.createElement( 'input' );
                                    input.type = 'file';
                                    input.accept = '*/*';

                                    input.onchange = () => {
                                        const file = input.files[0];
                                        if (file) {
                                            alert(12121);
                                        }
                                    };

                                    input.click();
                                });

                                return view;
                            });

                        }
                    }
  
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
                            CustomUploadAdapterPlugin,
                            AttachmentPlugin,
                            GeneralHtmlSupport
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
                            "link", "uploadImage", "attachment", "|"
                        ],
                        image: {
                            toolbar: [ 'imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side' ]
                        },
                        htmlSupport: {
                            allow: [
                                {
                                    name: 'div',
                                    classes: true
                                }
                            ]
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
