const Details = ({ path, id }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [active, setActive] = useState(null);
  const [item, setItems] = useState(null);
  const [associations, setAssociations] = useState({});

  const { error,  isLoading } = useQuery({
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
        key !== "id" && key !== "archived" 
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
    if (typeof value === "object" ) {
      return (value.value)
    }
    if (isDate(value)) {
      return formatDate(value);
    }
    return String(value);
  };

  const getHeaderCardProps = (path) => {
    if (path === "/jobs") {
      return {
        showDate: true,
        showFollowing: true,
        showServiceName: true,
        clarifierName:    !item ? "loading..." : item.job_name.value
      };
    } else if (path === "/sites") {
      return {
        showDate: false,
        showFollowing: false,
        showServiceName: false,
        clarifierName:    !item ? "loading..." : item.site_name.value
      };
    } else {
      return {
        showDate: false,
        showFollowing: false,
        showServiceName: true,
        clarifierName:    !item ? "loading..." : item.asset_name.value
      };
    }
  };

  const headerCardProps = getHeaderCardProps(path);

  const tableHeaders =
    path === "/jobs"
      ? ["stage_name", "status", "start_date", "end_date"]
      : Object.keys(item || {}).filter(
          (key) =>
            ![
              "id",
              "createdAt",
              "archived",
              "updatedAt",
              "hs_lastmodifieddate",
              "hs_createdate",
              "hs_object_id",
            ].includes(key)
        );

  const tableRows =
    item && tableHeaders.length > 0 ? (
      <TableBody>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableCell
              key={header}
              className="px-4 py-2 text-gray-900 dark:text-gray-100"
            >
              {renderCellContent(header, item[header])}
            </TableCell>
          ))}
          <TableCell>
            <div className="bg-black w-fit p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#EFEFEF"
              >
                <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    ) : null;

  return (
    <div className="grid grid-cols-6 gap-4 h-full dark:bg-dark-200">
      <div className="col-span-4">
        {isLoading && !item && <div className="loader-line"></div>}

        <HeaderCard
          bgImageClass="bg-custom-bg"
          plantName="South Plant"

          date="17/01/2024"
          serviceName="AquaFlow Service"
          following="Following"
          {...headerCardProps}
        />

        {(path === "/sites" || path === "/assets") && <MapsCard />}

        {path === "/jobs" ? (
          <div className="col-span-4">
            <Table className="w-full dark:bg-dark-300 my-8 bg-white rounded-md">
              <TableHeader>
                {tableHeaders.length > 0 && (
                  <TableRow>
                    {tableHeaders.map((header) => (
                      <TableHead
                        key={header}
                        className="px-4 py-2 font-semibold text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap"
                      >
                        {formatKey(header)}
                      </TableHead>
                    ))}

                    <TableHead className="text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap font-semibold">
                      <span>Report</span>
                    </TableHead>
                  </TableRow>
                )}
              </TableHeader>
              {tableRows}
            </Table>

            <div className="p-3 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
              {item &&
                filteredAndSortedEntries(item).map(
                  ([key, value], index, array) => (
                    <div
                      key={key}
                      className={`py-2 px-3 flex gap-x-5 ${
                        index === array.length - 1 ? "" : ""
                      }`}
                    >
                      <div className="text-sm font-semibold w-52">
                        {formatKey(key)}:
                      </div>
                      <div className="text-sm text-gray-500">
                        {renderCellContent(key, value)}
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        ) : (
          <div className="p-3 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
            {item &&
              filteredAndSortedEntries(item).map(
                ([key, value], index, array) => (
                  <div
                    key={key}
                    className={`py-2 px-3 flex gap-x-5 ${
                      index === array.length - 1 ? "" : ""
                    }`}
                  >
                    <div className="text-sm font-semibold w-52">
                      {formatKey(key)}:
                    </div>
                    <div className="text-sm text-gray-500">
                      {renderCellContent(key, value)}
                    </div>
                  </div>
                )
              )}
          </div>
        )}
      </div>

      <div className="col-span-2">
        {associations &&
          Object.entries(associations).map(([key, association]) => (
            <Accordion key={key}>
              <AccordionSummary>
                <div className="flex items-center gap-x-2 text-sm font-medium ">
                  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className="dark:fill-white fill-black"><path d="M140-100v-240h120v-160h200v-120H340v-240h280v240H500v120h200v160h120v240H540v-240h120v-120H300v120h120v240H140Zm240-560h200v-160H380v160ZM180-140h200v-160H180v160Zm400 0h200v-160H580v160ZM480-660ZM380-300Zm200 0Z"/></svg>
                  </span>
                  <span>
                    {association.label || formatKey(key)}{" "}
                    <span className="ml-2 px-2 py-1 rounded-md bg-blue-600 text-white text-xs">
                      {association.count}
                    </span>
                  </span>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <div className="flex flex-col">
                  {association.list && association.list.length > 0 && (
                    <div className="overflow-x-auto">
                      <div className="p-3 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
                        {Object.entries(association.list[0])
                          .filter(
                            ([itemKey, itemValue]) =>
                              ![
                                "id",
                                "createdAt",
                                "archived",
                                "updatedAt",
                                "hs_lastmodifieddate",
                                "hs_createdate",
                                "hs_object_id",
                              ].includes(itemKey) && itemValue !== null
                          )
                          .map(([itemKey, itemValue]) => (
                            <div
                              key={itemKey}
                              className="py-2 px-3 flex gap-x-5"
                            >
                              <div className="text-xs font-semibold w-32">
                                {formatKey(itemKey)}:
                              </div>
                              <div className="text-xs text-gray-500">
                                {renderCellContent(itemKey, itemValue)}
                              </div>
                            </div>
                          ))}
                      </div>
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
