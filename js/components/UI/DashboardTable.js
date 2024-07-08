const { useState, useEffect } = React;
const { useQuery } = ReactQuery;

const DashboardTable = () => {
  const fetchProducts = async (page) => {
    const response = await Client.products.all({}, null, page);
    return response;
  };

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ["userData", currentPage],
    queryFn: () => fetchProducts(currentPage),
  });

  const [posts, setPosts] = useState([]);
  const [postPerPage, setPostPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="max-w-[1150px]">
        <Table>
          <TableHeader>
            <TableRow>
              {posts.length > 0 &&
                Object.keys(posts[0]).map((key) => (
                  <TableHead key={key} className="whitespace-nowrap">
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
                    <div className="">{product.name}</div>
                    <div className="text-xs text-secondary"></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-start space-x-2 gap-x-5">
                    <Link
                      className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md"
                      to="/details"
                    >
                      View
                    </Link>
                    <button className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md">
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
    </>
  );
};
