const { useState, useEffect } = React;

const DynamicComponent = ({title, path}) => {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      jobs: [1, 2, 3, 4, 5],
      img: "https://cdn.pixabay.com/photo/2013/12/16/15/59/tree-229335_640.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      jobs: [1, 2, 3, 4, 5],
      img: "https://cdn.pixabay.com/photo/2013/12/16/15/59/tree-229335_640.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      jobs: [1, 2, 3, 4, 5],
      img: "https://cdn.pixabay.com/photo/2013/12/16/15/59/tree-229335_640.jpg",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarahwilliams@example.com",
      jobs: [1, 2, 3, 4, 5],
      img: "https://cdn.pixabay.com/photo/2013/12/16/15/59/tree-229335_640.jpg",
    },
    
  
  ];

  const [posts, setPosts] = useState(dummyData);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const pageItem = {
    start: (currentPage - 1) * postPerPage,
    end: currentPage * postPerPage,
  };

  const numOfPages = Math.ceil(posts.length / postPerPage);

  useEffect(() => {
    setCurrentPage(1); 
  }, [postPerPage, posts]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-3 pb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1">{title}</h1>
          <p className="text-secondary text-sm">List view of all sites</p>
        </div>

        <div className="border rounded-lg py-1 px-1 border-flatGray">
          <Tabs defaultValue="account" className="rounded-md">
            <TabsList className="">
              <TabsTrigger value="account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentcolor"
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

      <div className="flex justify-between items-center pb-5">
        <div className="flex gap-x-4">
          <CustomCheckbox />
          <CustomCheckbox />
          <CustomCheckbox />
        </div>

        <div className="w-[30%] h-10">
          <Input className="bg-transparent" />
        </div>
      </div>

      <div className="border border-2 rounded-md">
        <div className="flex justify-between items-center px-6 py-5">
          <div className="flex items-center gap-x-2 font-semibold text-sm ">
            <p className="text-secondary font-normal">Showing</p>
            <span className="border border-black w-8 h-8 flex items-center justify-center rounded-md">
              63
            </span>
            <span>/</span>
            <span className=" rounded-md">1280</span>
            <p className="text-secondary font-normal text-sm">Results</p>
          </div>

          <div>    <Select right={true}>
                
                <Options>
                    <h1 className="py-3 font-[500] text-lg">Client Filter</h1>
                    <hr className="py-1"></hr>
                    <div className="flex gap-x-3 py-2">
                    <p className="text-xs text-secondary cursor-pointer">select all</p>
                    <p className="text-xs text-secondary cursor-pointer">clear all</p>
                    </div>
                
    
                  <Option>
                    <Checkbox  label="Yokshire new housejbbb" />
                  </Option>
                  <Option>
                  <Checkbox  label="Yokshire new house" />
                  </Option>
                </Options>
              </Select></div>
        </div>

        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Jobs</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.slice(pageItem.start, pageItem.end).map((data) => (
              <TableRow key={data.id}>
                <TableCell className="flex items-center">
                  <img
                    src={data.img}
                    alt={data.name}
                    className="w-10 h-10 rounded-lg"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="">{data.name}</div>
                    <div className="text-xs text-secondary">{data.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {data.jobs.map((job) => (
                      <button
                        key={job}
                        className="w-6 h-6 rounded-full bg-primary text-white"
                      >
                        {job}
                      </button>
                    ))}
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

        <Pagination
          numOfPages={numOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
