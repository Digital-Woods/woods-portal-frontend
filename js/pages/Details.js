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
        <div className="border bg-gray-100 dark:bg-dark-300 rounded-lg w-fit p-1 border-flatGray">
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

        

        {isLoading && !item ? (
          <div className="loader-line"></div>
        ) : (
          <div>
            {activeTab === "overview" ? (
              <div>
                <div className="py-3 dark:bg-dark-300 border border-2 rounded-md my-10 dark:text-white">
                  {item &&
                    filteredAndSortedEntries(item).map(
                      ([key, value], index, array) => (
                        <div
                          key={key}
                          className={`py-4 px-3 flex gap-x-5 ${
                            index === array.length - 1 ? "" : "border-b"
                          }`}
                        >
                          <div className="font-semibold">{formatKey(key)}:</div>
                          <div>{renderCellContent(key, value)}</div>
                        </div>
                      )
                    )}
                </div>
              </div>
            ) : (
              <div className="dark:text-white">Under Construction</div>
            )}
          </div>
        )}
      </div>

      <div className="col-span-2">
        <div className="col-span-2">
          <div className="col-span-2">
            <div>
              {associations &&
                Object.entries(associations).map(([key, association]) => (
                  <Accordion key={key}>
                    <AccordionSummary>
                      <div className="flex items-center gap-x-2">
                        <span>{association.label || formatKey(key)}</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="flex flex-col gap-y-4 py-3">
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
                                          {renderCellContent(
                                            itemKey,
                                            itemValue
                                          )}
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
        </div>
      </div>
    </div>
  );
};
