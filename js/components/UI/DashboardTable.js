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

const DashboardTable = ({ path, inputValue, title }) => {
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeader, setTableHeader] = useState([]);
  const [after, setAfter] = useState("");
  const [sortConfig, setSortConfig] = useState("createdAt");
  const [isLoading, setIsLoading] = useState(true);
  const [filterPropertyName, setFilterPropertyName] = useState(null);
  const [filterOperator, setFilterOperator] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const { me } = useMe();

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    const hash = location.hash; // Get the hash fragment
    const queryIndex = hash.indexOf("?"); // Find the start of the query string in the hash
    const queryParams = new URLSearchParams(hash.substring(queryIndex)); // Parse the query string

    setFilterPropertyName(queryParams.get("filterPropertyName"));
    setFilterOperator(queryParams.get("filterOperator"));
    setFilterValue(queryParams.get("filterValue"));
  }, [location.search]);

  const { error, data, refetch } = useQuery({
    queryKey: [
      "TableData",
      path,
      itemsPerPage,
      after,
      sortConfig,
      // inputValue,
      me,
      filterPropertyName,
      filterOperator,
      filterValue,
    ],
    queryFn: async () =>
      await Client.objects.all({
        path,
        limit: itemsPerPage || 10,
        page: currentPage,
        after,
        me,
        sort: sortConfig,
        // inputValue,
        filterPropertyName,
        filterOperator,
        filterValue,
      }),
    onSuccess: (data) => {
      if (data.statusCode === "200") {
        const results = data.data.results || [];
        setTableData(results);
        setTotalItems(data.data.total || 0);
        setItemsPerPage(results.length > 0 ? itemsPerPage : 0);

        if (results.length > 0) {
          setTableHeader(sortData(results[0], "list", title));
        } else {
          setTableHeader([]);
        }
      }
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      setTableData([]);
    },
  });

  const handleSort = (column) => {
    let newSortConfig = column;
    if (sortConfig === column) {
      newSortConfig = `-${column}`;
    } else if (sortConfig === `-${column}`) {
      newSortConfig = column;
    }
    setSortConfig(newSortConfig);
    setIsLoading(true);
    refetch();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setAfter((page - 1) * itemsPerPage);
    setIsLoading(true);
    refetch();
  };

  const numOfPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    refetch();
  }, [inputValue]);

  return (
    <div className="shadow-md rounded-md dark:border-gray-700 bg-white dark:bg-dark-300">
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
            {tableData.length}
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
                  {tableHeader.map((item) => (
                    <TableHead
                      key={item.name}
                      className="whitespace-nowrap dark:text-white cursor-pointer"
                      onClick={() => handleSort(item.name)}
                    >
                      <div className="flex">
                        <span className="font-semibold text-xs">
                          {" "}
                          {item.label}{" "}
                        </span>
                        {sortConfig === item.name && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className="dark:fill-white cursor-pointer"
                          >
                            <path d="m280-400 200-200 200 200H280Z" />
                          </svg>
                        )}
                        {sortConfig === `-${item.name}` && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
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
                    {tableHeader.map((row) => (
                      <TableCell
                        key={row.name}
                        className="whitespace-nowrap border-b"
                      >
                        <div className="dark:text-white">
                          {renderCellContent(
                            row.name
                              .split(".")
                              .reduce((o, k) => (o || {})[k], item),
                            item.id,
                            path
                          )}
                        </div>
                      </TableCell>
                    ))}
                    {/* <TableCell>
                    <div className="flex items-center space-x-2 gap-x-5">
                      <Link
                        className="text-xs px-2 py-1 border border-input rounded-md whitespace-nowrap "
                        to={`${path}/${item.id}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </TableCell> */}
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
      )}
    </div>
  );
};
