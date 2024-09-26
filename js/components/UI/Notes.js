const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    className="fill:gray-200 dark:fill-white"
  >
    <path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z" />
  </svg>
);

const ThreeDotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    className="fill:gray-200 dark:fill-white"
  >
    <path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    className="fill:gray-200 dark:fill-white"
  >
    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
  </svg>
);

const PinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    className="fill:gray-200 dark:fill-white"
  >
    <path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.03-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z" />
  </svg>
);

const Notes = () => {
  const [showDialog, setShowDialog] = useState(false);

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
        className="max-w-md mx-auto bg-white p-6"
      >
        <h2 className="text-lg font-semibold">Under Construction</h2>
        <p className="text-sm text-gray-500 mt-2">
          This feature is under construction.
        </p>
      </Dialog>
    </div>
  );
};
