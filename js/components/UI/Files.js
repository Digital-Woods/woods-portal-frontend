const Files = () => {
  const filesData = [
    {
      id: 1,
      name: "Document 1",
      type: "PDF",
      dateModified: "Jan 01, 2024",
    },
    {
      id: 2,
      name: "Document 2",
      type: "Word",
      dateModified: "Jan 02, 2024",
    },
    {
      id: 3,
      name: "Document 3",
      type: "Excel",
      dateModified: "Jan 03, 2024",
    },
    {
      id: 4,
      name: "Document 4",
      type: "Image",
      dateModified: "Jan 04, 2024",
    },
    {
      id: 5,
      name: "Document 5",
      type: "PowerPoint",
      dateModified: "Jan 05, 2024",
    },
    {
      id: 6,
      name: "Document 6",
      type: "Text",
      dateModified: "Jan 06, 2024",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "PDF":
        return "📄";
      case "Word":
        return "📝";
      case "Excel":
        return "📊";
      case "Image":
        return "🖼️";
      case "PowerPoint":
        return "📽️";
      case "Text":
        return "📑";
      default:
        return "📁";
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className=" rounded-lg  mt-2 bg-cleanWhite dark:bg-dark-300 p-4">
        <div className="flex justify-between mt-2 mb-6 items-center">
          <CustomCheckbox buttonText="Sites" spanText="3" showSpan={true} />
          <Button className="text-white" onClick={() => setIsDialogOpen(true)}>
            <span className="mr-2"> + </span> New Document
          </Button>
        </div>
        <Table className="w-full border rounded-lg overflow-hidden">
          <TableHeader className="bg-graySecondary dark:bg-dark-300">
            <TableRow>
              <TableHead className="py-2 text-left text-xs"></TableHead>
              <TableHead className="pr-4 py-2 text-left dark:text-white text-xs">
                Name
              </TableHead>
              <TableHead className="px-4 py-2 text-right text-xs"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filesData.map((file) => (
              <TableRow key={file.id} className="border-t">
                <TableCell className="px-4 py-2 text-xs">
                  <div>{getIcon(file.type)}</div>
                </TableCell>
                <TableCell className="px-4 py-2 text-xs">
                  <div className="dark:text-white">{file.name}</div>
                  <div className="text-gray-500 dark:text-white text-xs">
                    {file.type}
                  </div>
                </TableCell>

                <TableCell className="px-4 py-2 text-right">
                  <button className="border border-gray-200 dark:text-white text-xs px-3 py-1 rounded mr-2">
                    Open
                  </button>
                  <button className="border border-gray-200 dark:text-white text-xs px-3 py-1 rounded">
                    Download
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-x-2 pt-3 text-sm">
            <p className="text-secondary leading-5 text-sm dark:text-gray-300">
              Showing
            </p>
            <span className="border border-2 dark:text-white border-black font-medium w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
              6
            </span>
            <span className="dark:text-white">/</span>
            <span className="rounded-md dark:text-white font-medium">6</span>
            <p className="text-secondary dark:text-white font-normal text-sm dark:text-gray-300">
              Results
            </p>
          </div>
          <Pagination />
        </div>
      </div>

      <Dialog open={isDialogOpen} onClose={closeDialog} className="mx-auto">
        <FileUpload />
      </Dialog>
    </div>
  );
};
