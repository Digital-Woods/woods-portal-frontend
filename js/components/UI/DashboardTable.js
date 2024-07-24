const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const priorityOrder = {
  email: 2,
  description: 3,
  city: 4,
  role: 5,
};

const getPriority = (key) => {
  const keyLower = key.toLowerCase();
  if (keyLower.includes("name")) {
    return 1;
  }
  const extractedKey = key.split(".").pop().toLowerCase();
  return priorityOrder[extractedKey] || Number.MAX_VALUE;
};

const sortedHeaders = (headers) => {
  return headers.sort((a, b) => getPriority(a.name) - getPriority(b.name));
};

const DashboardTable = ({ path, inputValue }) => {
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeader, setTableHeader] = useState([]);
  const [after, setAfter] = useState("");
  const [sortConfig, setSortConfig] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { error, data, refetch } = useQuery({
    queryKey: ["TableData", path, itemsPerPage, after, sortConfig, inputValue],
    queryFn: async () =>
      await Client.objects.all({
        path,
        limit: itemsPerPage,
        after,
        sort: sortConfig,
        inputValue,
      }),
    onSuccess: (data) => {
      if (data.statusCode === "200") {
        const results = data.data.results || [];
        setTableData(results);
        setTotalItems(data.data.total || 0);
        setItemsPerPage(results.length > 0 ? itemsPerPage : 0);

        if (results.length > 0) {
          const headersArray = Object.keys(results[0]).reduce((acc, key) => {
            if (key === "id" || key === "archived" || key === "associations") {
              return acc;
            }
            if (
              typeof results[0][key] === "object" &&
              results[0][key] !== null &&
              results[0][key].type === "link"
            ) {
              acc.push({
                name: key,
                label: results[0][key].label,
              });
            } else {
              acc.push({
                name: key,
                label: formatKey(key),
              });
            }
            return acc;
          }, []);
          const sortedHeadersArray = sortedHeaders(headersArray);
          setTableHeader(sortedHeadersArray);
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

  const renderCellContent = (value, name, itemId) => {
    if (isNull(value)) {
      return "-";
    }
    if (isObject(value) && isEmptyObject(value)) {
      return "-";
    }
    if (isObject(value) && value.type === "link") {
      return (
        <Link
          className="text-xs px-2 py-1 border border-input rounded-md"
          to={`/${value.featureName}`}
        >
          View
        </Link>
      );
    }
    if (isDate(value)) {
      return formatDate(value);
    }
  
    const cellContent = isObject(value) ? JSON.stringify(value) : String(value);
    const { truncated, isTruncated } = truncateString(cellContent);
  
    return isTruncated ? (
      <Tooltip content={cellContent}>
        {truncated}
      </Tooltip>
    ) : (
      truncated
    );
  };
  

  return (
    <div className="shadow-md rounded-md dark:border-gray-700 bg-white dark:bg-dark-300">
      {isLoading && <div className="loader-line"></div>}
      {!isLoading && tableData.length === 0 && (
        <div className="text-center p-5">
          <p className="text-secondary dark:text-gray-300">
            Sorry, unfortunately, there is no data available.
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

        <Select right={true} />
      </div>
      <div className="overflow-x-auto">
        {!isLoading && tableData.length > 0 && (
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
                   <span className="font-semibold text-xs" >   {item.label} </span>  
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
                <TableHead className="font-semibold text-xs">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  {tableHeader.map((row) => (
                    <TableCell key={row.name} className="whitespace-nowrap">
                      <div className="dark:text-white">
                        {renderCellContent(
                          row.name
                            .split(".")
                            .reduce((o, k) => (o || {})[k], item),
                          row.name,
                          item.id
                        )}
                      </div>
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center space-x-2 gap-x-5">
                      <Link
                        className="text-xs px-2 py-1 border border-input rounded-md  "
                        to={`${path}/${item.id}`}
                      >
                        View
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {!isLoading && tableData.length > 0 && (
        <div className="flex justify-end p-4">
          <Pagination
            numOfPages={numOfPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
