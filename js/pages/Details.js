const { useState } = React;
const { useQuery } = ReactQuery;


const Loader = () => (
  <div role="status" className="flex items-center justify-center p-4">
    <svg
      aria-hidden="true"
      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const Details = ({ path, id }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [active, setActive] = useState(null);
  const [item, setItems] = useState(null);
  const [associations, setAssociations] = useState({});

  const { error, data, isLoading } = useQuery({
    queryKey: ["DetailsData", path, id],
    queryFn: async () =>
      await Client.objects.byObjectId({
        path,
        objectId: id,
      }),
    onSuccess: (data) => {
      console.log("Fetched data:", data);
      setAssociations(data.data.associations || {});
      delete data.data["associations"];
      setItems(data.data);
    },
  });

  

  if (error) {
    return <div>Error fetching data</div>;
  }

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="grid grid-cols-6 gap-4 h-full dark:bg-gray-800">
      <div className="col-span-4">
        <div className="border bg-gray-100 dark:bg-gray-900 rounded-lg w-fit py-2 px-4 border-flatGray">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="rounded-md"
          >
            <TabsList className="">
              <TabsTrigger
                value="overview"
                isActive={activeTab === "overview"}
                onClick={() => handleTabClick("overview")}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="history"
                isActive={activeTab === "history"}
                onClick={() => handleTabClick("history")}
              >
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview"></TabsContent>
            <TabsContent value="history"></TabsContent>
          </Tabs>
        </div>

        {activeTab == "overview" ? (
          <div>
            {" "}
            {isLoading && !item ? (
                <Loader />
              ) :
            <div className=" py-3  dark:bg-gray-900 border border-2 rounded-md my-10 dark:text-white">
              
              {item &&
                Object.entries(item).map(([key, value]) => (
                  <div key={key} className="py-4 px-3 flex gap-x-5 border-b">
                    <div className="font-semibold">{key}:</div>
                    <div> {String(value)} </div>
                  </div>
                ))}
            </div>
}
          </div> 
        ) : (
          <div>2</div>
        )}
      </div>

      <div className="col-span-2">
        <div className="col-span-2">
          <div className="col-span-2">
          <div>
          {associations && Object.entries(associations).map(([key, association]) => (
            <Accordion key={key}>
              <AccordionSummary>
                <div className="flex items-center gap-x-2">
                  <span>{association.label || key}</span> 
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-y-4 py-3">
                  {association.list && association.list.map((item) => (
                    <div key={item.id} className="py-1">
                      {Object.entries(item).map(([itemKey, itemValue]) => (
                        <div key={itemKey}>
                          <strong>{itemKey}:</strong> {String(itemValue)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};
