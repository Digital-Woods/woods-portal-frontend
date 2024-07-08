const { useState, useEffect } = React;
const { useQuery } = ReactQuery;

const DynamicComponent = ({ title, path }) => {
  const fetchProducts = async (page) => {
    const response = await Client.products.all({ page });
    return response;
  };
  const [activeTab, setActiveTab] = useState("account");

  const [posts, setPosts] = useState([]);
  const [postPerPage, setPostPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ["userData", currentPage],
    queryFn: () => fetchProducts(currentPage),
  });

  useEffect(() => {
    if (data) {
      setPosts(data.data);
      setTotalPosts(data.total);
      setPostPerPage(data.per_page);
    }
  }, [data]);

  const numOfPages = Math.ceil(totalPosts / postPerPage);

  useEffect(() => {
    refetch();
  }, [currentPage, postPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error loading data</div>;
  }

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center pt-3 pb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1">{title}</h1>
          <p className="text-secondary text-sm">List view of all sites</p>
        </div>
        <div className="border rounded-lg py-1 px-1 border-flatGray dark:border-gray-700">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-md">
            <TabsList>
              <TabsTrigger value="account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentcolor"
                  className="dark:fill-white"
                >
                  <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" />
                </svg>
              </TabsTrigger>
              <TabsTrigger value="password">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentcolor"
                  className="dark:fill-white"
                >
                  <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
                </svg>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account"></TabsContent>
            <TabsContent value="password"></TabsContent>
          </Tabs>
        </div>
        <div>
          <Button>New Site +</Button>
        </div>
      </div>

      {activeTab === "account" ? (
        <div>
          <div className="flex justify-between items-center pb-5">
            <div className="flex gap-x-4">
              <CustomCheckbox />
              <CustomCheckbox />
              <CustomCheckbox />
            </div>

            <div className="w-[20%] h-10">
              <Input className="bg-transparent dark:bg-gray-700" />
            </div>
          </div>


          <div className="border border-2 rounded-md  dark:border-gray-700 dark:bg-gray-900 ">
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex items-center gap-x-2 font-semibold text-sm">
                <p className="text-secondary font-normal dark:text-gray-300">Showing</p>
                <span className="border border-black w-8 h-8 flex items-center justify-center rounded-md dark:border-white">
                  {posts.length}
                </span>
                <span>/</span>
                <span className="rounded-md">{totalPosts}</span>
                <p className="text-secondary font-normal text-sm dark:text-gray-300">Results</p>
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

            <div className="overflow-x-auto md:max-w-[155vh] max-w-[100vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    {posts.length > 0 &&
                      Object.keys(posts[0]).map((key) => (
                        <TableHead key={key} className="whitespace-nowrap dark:text-white">
                          {key.toUpperCase().replace("_", " ").replace("_", " ")}
                        </TableHead>
                      ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt={product.name}
                          className="w-10 h-10 rounded-lg"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="dark:text-white">{product.name}</div>
                          <div className="text-xs text-secondary"></div>
                        </div>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination
              numOfPages={numOfPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </div>
        </div>
      
      ) : (
        <div className="dark:text-white">Under Construction</div>
      )}
    </div>
  );
};