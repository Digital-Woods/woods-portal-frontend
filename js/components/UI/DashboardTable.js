const { useQuery } = ReactQuery;

const DashboardTable = ({ path, inputValue }) => {
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHeader, setTableHeader] = useState([]);
  const [after, setAfter] = useState("");
  const [sortConfig, setSortConfig] = useState("");

  const { error, data, isLoading, refetch } = useQuery({
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
        const results = data.data.results;
        setTableData(results);
        setTotalItems(data.data.total);
        setItemsPerPage(results.length > 0 ? itemsPerPage : 0);

        const headersArray = Object.keys(results[0] || {}).map((key) => ({
          name: key,
          label: key
            .split(/(?=[A-Z])/)
            .join(" ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        }));
        setTableHeader(headersArray);
      }
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
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setAfter((page - 1) * itemsPerPage);
    refetch();
  };

  const numOfPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    refetch();
  }, [inputValue]);

  return (
    <div className="border border-2 rounded-md dark:border-gray-700 dark:bg-gray-900 w-full">
      {isLoading && <div className="loader-line"></div>}
      <div className="flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-x-2 font-semibold text-sm">
          <p className="text-secondary font-normal dark:text-gray-300">
            Showing
          </p>
          <span className="border border-black w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
            {itemsPerPage}
          </span>
          <span>/</span>
          <span className="rounded-md">{totalItems}</span>
          <p className="text-secondary font-normal text-sm dark:text-gray-300">
            Results
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        {tableData.length === 0 ? (
          <div className="text-center p-5">
            <p className="text-secondary dark:text-gray-300">
              Sorry, unfortunately, there is no data available.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeader.map((item) => (
                  <TableHead
                    key={item.name}
                    className="whitespace-nowrap dark:text-white cursor-pointer"
                    onClick={() => handleSort(item.name)}
                  >
                    <div className="flex">
                      {item.label}
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
                <TableHead className="whitespace-nowrap dark:text-white">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  {tableHeader.map((row) => (
                    <TableCell key={row.name}>
                      <div>
                        <div className="dark:text-white">{item[row.name]}</div>
                      </div>
                    </TableCell>
                  ))}

                  <TableCell>
                    <div className="flex items-center justify-end space-x-2 gap-x-5">
                      <Link
                        className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                        to="/details"
                      >
                        View
                      </Link>
                      {/* <button className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                        Edit
                      </button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {tableData.length > 0 && (
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
