const { useState } = React;
const { useQuery } = ReactQuery;

const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

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

  const priorityKeys = ["name", "description", "email", "city"];

  const filteredAndSortedEntries = (obj) => {
    const entries = Object.entries(obj).filter(
      ([key, value]) =>
        key !== "id" && key !== "archived" && typeof value !== "object"
    );

    entries.sort(([keyA], [keyB]) => {
      const isNameA = keyA.toLowerCase().includes("name");
      const isNameB = keyB.toLowerCase().includes("name");

      if (isNameA && !isNameB) return -1;
      if (!isNameA && isNameB) return 1;

      const indexA = priorityKeys.indexOf(keyA);
      const indexB = priorityKeys.indexOf(keyB);
      if (indexA !== -1 && indexB === -1) return -1;
      if (indexA === -1 && indexB !== -1) return 1;

      if (indexA === -1 && indexB === -1) {
        if (
          ["createdAt", "updatedAt"].includes(keyA) &&
          !["createdAt", "updatedAt"].includes(keyB)
        )
          return 1;
        if (
          ["createdAt", "updatedAt"].includes(keyB) &&
          !["createdAt", "updatedAt"].includes(keyA)
        )
          return -1;
        return 0;
      }
      return indexA - indexB;
    });

    const additionalEntries = entries.filter(([key]) =>
      ["createdAt", "updatedAt"].includes(key)
    );
    const sortedEntries = entries.filter(
      ([key]) => !["createdAt", "updatedAt"].includes(key)
    );
    return [...sortedEntries, ...additionalEntries];
  };

  const renderCellContent = (key, value) => {
    if (isDate(value)) {
      return formatDate(value);
    }
    return String(value);
  };

  return (


    <div className="grid grid-cols-6 gap-4 h-full dark:bg-dark-200">
      <div className="col-span-4">
        {/* <div className="border bg-gray-100 dark:bg-dark-300 rounded-lg w-fit p-1 border-flatGray">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="rounded-md bg-white"
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
        </div> */}

{isLoading && !item && (
          <div className="loader-line"></div>
) } 

        <div className="relative bg-[url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-32 rounded-lg w-full flex items-center justify-between overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative flex flex-col justify-center px-4 text-white z-10">
            <p className="text-xs font-normal text-flatGray">South Plant</p>
            <p className="text-2xl font-semibold mt-1">Primary Clarifier CL100</p>
            <span className="bg-sidelayoutColor w-fit px-3 py-1 rounded-md mt-2">
              <p className="text-xs">AquaFlow Service</p>
            </span>
          </div>

          <div className="relative flex gap-4 px-4 z-10">
            <span className="bg-white rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                className="fill-black"
              >
                <path d="M216-216h44.46l393.46-393.46-44.46-44.46L216-260.46V-216Zm-52 52v-118.38l497.62-498.39q8.07-8.24 17.37-11.73 9.3-3.5 19.49-3.5 10.2 0 19.47 3.27 9.28 3.27 17.97 11.58l44.85 44.46q8.31 8.69 11.77 18 3.46 9.31 3.46 19.17 0 10.51-3.64 20.06-3.65 9.55-11.59 17.46L282.38-164H164Zm580.38-535.15-45.23-45.23 45.23 45.23ZM631.3-631.3l-21.84-22.62 44.46 44.46-22.62-21.84Z" />
              </svg>
            </span>

            <span className="bg-white rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                className="fill-red-600"
              >
                <path d="M324.31-164q-26.62 0-45.47-18.84Q260-201.69 260-228.31V-696h-48v-52h172v-43.38h192V-748h172v52h-48v467.26q0 27.74-18.65 46.24Q662.7-164 635.69-164H324.31ZM648-696H312v467.69q0 5.39 3.46 8.85t8.85 3.46h311.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-696ZM400.16-288h51.99v-336h-51.99v336Zm107.69 0h51.99v-336h-51.99v336ZM312-696v480-480Z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="relative bg-[url('https://lh3.googleusercontent.com/KIy0SU9X2AU03o4zutzTZqDb9nvxhKfY6MBpCX-te4wgyjOmc3yGxzVl_bmGg54jEJoWKzhpL6Sh4sKm2Li5x5dfi0Qb5xu753OiwAn9=rw-e365-w1375')] bg-cover bg-center h-64 rounded-lg w-full mt-5 flex items-center justify-between overflow-hidden">
  <span className="absolute bottom-4 flex gap-x-4 right-4 bg-white text-gray-400 rounded-md px-4 py-2 font-medium text-sm">
    Get Directions

    <span>
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m600-165.54-240-72-139.15 45.61q-20.69 6.85-38.77-5.42Q164-209.62 164-233.31v-462.61q0-14.85 8.35-26.77 8.34-11.92 20.81-16.15L360-794.46l240 72 139.15-45.61q20.69-8.85 38.77 3.84 18.08 12.69 18.08 36v465.69q0 15.23-8.42 27.46-8.43 12.23-22.27 15.46L600-165.54Zm-26-61.38v-450l-188-56.93v450l188 56.93Zm52-2L744-268v-448l-118 39.08v448ZM216-244l118-39.85v-448L216-692v448Zm410-432.92v448-448Zm-292-54.93v448-448Z"/></svg>
    </span>
  </span>
</div>


       
          <div>
            <div>
              <div className="py-3 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
                {item &&
                  filteredAndSortedEntries(item).map(
                    ([key, value], index, array) => (
                      <div
                        key={key}
                        className={`py-2 px-3 flex gap-x-5 ${
                          index === array.length - 1 ? "" : ""
                        }`}
                      >
                        <div className="text-sm font-semibold w-52">{formatKey(key)}:</div>
                        <div className="text-sm text-gray-500">{renderCellContent(key, value)}</div>
                      </div>
                    )
                  )}
              </div>
            </div>
            {/* ) : (
              <div className="dark:text-white">Under Construction</div>
            )} */}
          </div>
        
      </div>

      <div className="col-span-2">
        {associations &&
          Object.entries(associations).map(([key, association]) => (
            <Accordion key={key}>
              
              
              <AccordionSummary>
                <div className="flex items-center gap-x-2 text-sm font-medium ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#000000"
                    >
                      <path d="M180.31-164q-27.01 0-45.66-18.65Q116-201.3 116-228.31v-407.38q0-27.01 18.65-45.66Q153.3-700 180.31-700H356v-59.9q0-27.1 18.68-45.6Q393.35-824 420.4-824h119.56q27.04 0 45.54 18.65t18.5 45.66V-700h175.69q27.01 0 45.66 18.65Q844-662.7 844-635.69v407.38q0 27.01-18.65 45.66Q806.7-164 779.69-164H180.31Zm0-52h599.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-407.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H180.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v407.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM408-700h144v-59.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H420.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-700ZM168-216v-432 432Z" />
                    </svg>
                  </span>
                  <span>{association.label || formatKey(key)}</span>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <div className="flex flex-col">
                  {association.list && association.list.length > 0 && (
                    <div className="overflow-x-auto">
                      <Table className="w-full text-left border-collapse">
                        <TableHeader>
                          <TableRow>
                            {Object.keys(association.list[0])
                              .filter(
                                (itemKey) =>
                                  ![
                                    "id",
                                    "createdAt",
                                    "archived",
                                    "updatedAt",
                                    "hs_lastmodifieddate",
                                    "hs_createdate",
                                    "hs_object_id",
                                  ].includes(itemKey)
                              )
                              .map((itemKey) => (
                                <TableHead
                                  key={itemKey}
                                  className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300"
                                >
                                  {formatKey(itemKey)}
                                </TableHead>
                              ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {association.list.map((item) => (
                            <TableRow
                              key={item.id}
                              className="border-b last:border-none"
                            >
                              {Object.entries(item)
                                .filter(
                                  ([itemKey]) =>
                                    ![
                                      "id",
                                      "createdAt",
                                      "archived",
                                      "updatedAt",
                                      "hs_lastmodifieddate",
                                      "hs_createdate",
                                      "hs_object_id",
                                    ].includes(itemKey)
                                )
                                .map(([itemKey, itemValue]) => (
                                  <TableCell
                                    key={itemKey}
                                    className="px-4 py-2 text-gray-900 dark:text-gray-100"
                                  >
                                    {renderCellContent(itemKey, itemValue)}
                                  </TableCell>
                                ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </AccordionDetails>

            </Accordion>
          ))}
      </div>
    </div>
  );
};
