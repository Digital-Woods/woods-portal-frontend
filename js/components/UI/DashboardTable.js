const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const priorityOrder = {
  email: 3,
  description: 4,
  city: 5,
  role: 6,
};

const getPriority = (key) => {
  const keyLower = key.toLowerCase();
  if (keyLower.includes("job_name")) {
    return 1;
  } else if (keyLower.includes("name")) {
    return 2;
  }

  const extractedKey = key.split(".").pop().toLowerCase();
  return priorityOrder[extractedKey] || Number.MAX_VALUE;
};

const sortedHeaders = (headers) => {
  return headers.sort((a, b) => getPriority(a.name) - getPriority(b.name));
};

const { BrowserRouter, Route, Switch, withRouter } = window.ReactRouterDOM;

const DashboardTable = ({ hubspotObjectTypeId, path, inputValue, title }) => {
  const [tableData, setTableData] = useState([]);
  const [currentTableData, setCurrentTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeader, setTableHeader] = useState([]);
  const [after, setAfter] = useState("");
  const [sortConfig, setSortConfig] = useState("hs_createdate");
  const [filterPropertyName, setFilterPropertyName] = useState(null);
  const [filterOperator, setFilterOperator] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const numOfPages = Math.ceil(totalItems / itemsPerPage);

  const { me } = useMe();
  useEffect(() => {
    const hash = location.hash; // Get the hash fragment
    const queryIndex = hash.indexOf("?"); // Find the start of the query string in the hash
    const queryParams = new URLSearchParams(hash.substring(queryIndex)); // Parse the query string

    setFilterPropertyName(queryParams.get("filterPropertyName"));
    setFilterOperator(queryParams.get("filterOperator"));
    setFilterValue(queryParams.get("filterValue"));
  }, [location.search]);

  const mapResponseData = (data) => {
    console.log('data', data)
    const results = data.data.results.rows || [];
    const columns = data.data.results.columns || [];

    if (env.DATA_SOURCE_SET === true) {
      const foundItem = results.find((item) => {
        return item.name === path.replace("/", "");
      });
      setCurrentTableData(foundItem.results);
      setTotalItems(foundItem.results.length || 0);
      setItemsPerPage(foundItem.results.length > 0 ? itemsPerPage : 0);
      // if (foundItem.results.length > 0) {
      //   setTableHeader(sortData(foundItem.results[0], "list", title));
      // } else {
      //   setTableHeader([]);
      // }
    } else {
      setTableData(results);
      setTotalItems(data.data.total || 0);
      setItemsPerPage(results.length > 0 ? itemsPerPage : 0);

      // if (results.length > 0) {
      //   setTableHeader(sortData(results[0], "list", title));
      // } else {
      //   setTableHeader([]);
      // }
    }
    setTableHeader(columns);
  };
  const portalId = getPortal().portalId
  const { mutate: getData, isLoading } = useMutation({
    mutationKey: [
      "TableData",
      path,
      itemsPerPage,
      after,
      sortConfig,
      // inputValue,
      me,
      portalId,
      hubspotObjectTypeId,
      filterPropertyName,
      filterOperator,
      filterValue,
    ],
    mutationFn: async () => {
      console.log('mutationFn', )
      return await Client.objects.all({
        path,
        limit: itemsPerPage || 10,
        page: currentPage,
        // after,
        ...(after &&
          after.length > 0 && {
          after,
        }),
        me,
        portalId: portalId,
        hubspotObjectTypeId: hubspotObjectTypeId,
        sort: sortConfig,
        // inputValue,
        filterPropertyName,
        filterOperator,
        filterValue,
      });
    },

    onSuccess: (data) => {
      console.log('data', data)
      if (data.statusCode === "200") {
        mapResponseData(data);
      }
    },
    onError: () => {
      setTableData([]);
    },
  });
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleSort = (column) => {
    let newSortConfig = column;
    if (sortConfig === column) {
      newSortConfig = `-${column}`; // Toggle to descending if the same column is clicked again
    } else if (sortConfig === `-${column}`) {
      newSortConfig = column; // Toggle back to ascending if clicked again
    }
    setSortConfig(newSortConfig);

    if (env.DATA_SOURCE_SET === true) {
      // Handle sorting for local data (currentTableData)
      const sortedData = [...currentTableData].sort((a, b) => {
        const columnValueA = getValueByPath(a, column);
        const columnValueB = getValueByPath(b, column);

        if (newSortConfig.startsWith('-')) {
          return columnValueA > columnValueB ? -1 : columnValueA < columnValueB ? 1 : 0;
        }
        return columnValueA < columnValueB ? -1 : columnValueA > columnValueB ? 1 : 0;
      });
      setTableData(sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    } else {
      // Fetch new sorted data from API if `env.DATA_SOURCE_SET !== true`
      getData();
    }
  };

  // Helper function to get the value by key from nested objects
  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };


  const handlePageChange = async (page) => {
    if (env.DATA_SOURCE_SET === true) {
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
      setAfter((page - 1) * itemsPerPage);
      await wait(100);
      getData();
    }
  };
  useEffect(() => {
    if (env.DATA_SOURCE_SET === true) {
      setTableData(currentTableData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ));
    }
  }, [currentTableData, currentPage, itemsPerPage]);
  // useEffect(() => {
  //   if (!isLivePreview() && env.DATA_SOURCE_SET !== true) getData();
  // }, [inputValue]);

  useEffect(() => {
    // if (isLivePreview()) {
    //   mapResponseData(fakeTableData);
    // } else if (env.DATA_SOURCE_SET == true) {
    //   mapResponseData(fakeTableData);
    // } else {
    //   getData();
    // }
    console.log('useEffect', true)
    getData();
  }, []);

  const setDialogData = (data) => {
    setModalData(data);
    setOpenModal(true);
  };

  return (
    <div className="shadow-md rounded-md dark:border-gray-700 bg-cleanWhite dark:bg-dark-300">
      {isLoading && <div className="loader-line"></div>}
      {!isLoading && tableData.length === 0 && (
        <div className="text-center p-5">
          <p className="text-secondary text-2xl dark:text-gray-300">
            No records found
          </p>
        </div>
      )}
      <div className="flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-x-2 pt-3 text-sm">
          <p className="text-secondary leading-5 text-sm dark:text-gray-300">
            Showing
          </p>
          <span className="border border-2 border-black font-medium w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
            {endItem}
          </span>
          <span>/</span>
          <span className="rounded-md font-medium">{totalItems}</span>
          <p className="text-secondary font-normal text-sm dark:text-gray-300">
            Results
          </p>
        </div>

        {/* {tableData.length > 0 && <Select buttonText="Order: Ascending" />} */}
      </div>

      {tableData.length > 0 && (
        <React.Fragment>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  {tableHeader.map((column) => (
                    <TableHead
                      key={column.key}
                      className="whitespace-nowrap dark:text-white cursor-pointer"
                      onClick={() => handleSort(column.key)}
                    >
                      <div className="flex columns-center">
                        <span className="font-semibold text-xs">
                          {column.value}
                        </span>
                        {sortConfig === column.key && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className="dark:fill-white cursor-pointer"
                          >
                            <path d="m280-400 200-200 200 200H280Z" />
                          </svg>
                        )}
                        {sortConfig === `-${column.key}` && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className="dark:fill-white cursor-pointer"
                          >
                            <path d="M480-360 280-560h400L480-360Z" />
                          </svg>
                        )}
                      </div>
                    </TableHead>
                  ))}
                  {/* <TableHead className="font-semibold text-xs">
                  Actions
                </TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item.id}>
                    {tableHeader.map((column) => (
                      <TableCell
                        key={column.value}
                        className="whitespace-nowrap border-b"
                      >
                        <div className="dark:text-white">
                          {/* {renderCellContent(
                            column.value
                              .split(".")
                              .reduce((o, k) => (o || {})[k], item),
                            item.id,
                            path
                          )} */}
                          {item[column.key]}
                        </div>
                      </TableCell>
                    ))}
                    {env.DATA_SOURCE_SET === true &&
                      <TableCell>
                        <div className="flex items-center space-x-2 gap-x-5">
                          <Link
                            className="text-xs px-2 py-1 border border-input rounded-md whitespace-nowrap "
                            to={`${path}/${item.id}`}
                          >
                            View Details
                          </Link>
                        </div>
                      </TableCell>
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end px-4">
            <Pagination
              numOfPages={numOfPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </div>
        </React.Fragment>
      )
      }
      {env.DATA_SOURCE_SET === true &&
        <Dialog open={openModal} onClose={setOpenModal} className="bg-custom-gradient rounded-md sm:min-w-[430px]">
          <div className="rounded-md flex-col gap-6 flex">
            <h3 className="text-start text-xl font-semibold">
              Details
            </h3>
            {modalData &&
              Object.keys(modalData).map((key) => (
                <div key={key} className="flex justify-between items-center w-full gap-1 border-b">
                  {key !== 'iframe_file' && key !== 'id' ? (
                    <div className="w-full">
                      <div className="text-start dark:text-white">
                        {formatKey(key)} -
                      </div>
                      <div className="dark:text-white text-end">
                        {modalData[key]}
                      </div>
                    </div>
                  ) : key === 'iframe_file' ? (
                    <div>
                      Hello {modalData[key].replace(";", ',')}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            <div className="pt-3 text-end">
              <Button
                onClick={() => setOpenModal(false)}
              >
                Close

              </Button>
            </div>
          </div>
        </Dialog>
      }
    </div >
  );
};
