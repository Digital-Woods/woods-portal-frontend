const { useQuery } = ReactQuery;

const DashboardTable = ({ path }) => {
  const [tableData, setTableData] = useState([]);
  const [totalitems, setTotalItems] = useState(null);
  const [tableHeader, setTableHeader] = useState([]);

  const { error, data, isLoading } = useQuery({
    queryKey: ["TableData", path],
    queryFn: async () => await Client.objects.all({ path }),
    onSuccess: (data) => {
      if (data.statusCode === "200") {
        setTableData(data.data.results);
        setTotalItems(data.data.total);

        const headersArray = Object.keys(data.data.results[0]).map((key) => {
          return {
            name: key,
            label: key
              .split(/(?=[A-Z])/)
              .join(" ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
          };
        });
        setTableHeader(headersArray);
      }
    },
  });

  console.log(data, "TAble Data");

  return (
    <div className="border border-2 rounded-md dark:border-gray-700 dark:bg-gray-900 w-full">
      {isLoading && <div className="loader-line"></div>}
      <div className="flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-x-2 font-semibold text-sm">
          <p className="text-secondary font-normal dark:text-gray-300">
            Showing
          </p>
          <span className="border border-black w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
            5
          </span>
          <span>/</span>
          <span className="rounded-md">{totalitems}</span>
          <p className="text-secondary font-normal text-sm dark:text-gray-300">
            Results
          </p>
        </div>

        <div>
          <Select>
            <Options right={true}>
              <h1 className="py-3 font-[500] text-lg">Client Filter</h1>
              <hr className="py-1"></hr>
              <div className="flex gap-x-3 py-2">
                <p className="text-xs text-secondary cursor-pointer dark:text-gray-300">
                  select all
                </p>
                <p className="text-xs text-secondary cursor-pointer dark:text-gray-300">
                  clear all
                </p>
              </div>

              <Option>
                <Checkbox label="Yokshire new housejbbb" />
              </Option>
              <Option>
                <Checkbox label="Yokshire new house" />
              </Option>
            </Options>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map((item) => (
                <TableHead
                  key={item.name}
                  className="whitespace-nowrap dark:text-white"
                >
                  {item.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                {tableHeader.map((row) => (
                  <TableCell>
                    <div>
                      <div className="dark:text-white">{item[row.name]}</div>
                    </div>
                  </TableCell>
                ))}

                {/* <TableCell>
                  <div className="flex items-center justify-start space-x-2 gap-x-5">
                    <Link
                      className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      to="/details"
                    >
                      View
                    </Link>
                    <button className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                      Edit
                    </button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination />
    </div>
  );
};
