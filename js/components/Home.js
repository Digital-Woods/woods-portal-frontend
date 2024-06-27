
const Home = () => {
  const dummyData = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', jobs: [1, 2, 3, 4, 5], img: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', jobs: [1, 2, 3, 4, 5], img: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Mike Johnson', email: 'mikejohnson@example.com', jobs: [1, 2, 3, 4, 5], img: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Sarah Williams', email: 'sarahwilliams@example.com', jobs: [1, 2, 3, 4, 5], img: 'https://via.placeholder.com/40' },
    { id: 5, name: 'Chris Brown', email: 'chrisbrown@example.com', jobs: [1, 2, 3, 4, 5], img: 'https://via.placeholder.com/40' },
    { id: 6, name: 'Patricia Davis', email: 'patriciadavis@example.com', jobs: [1, 2, 3, 4, 5], img: 'https://via.placeholder.com/40' },
  ];
  



  return (
    <div>
      <div className="flex justify-between items-center pt-3 pb-8">
        <div>
          <h1 className="text-xl font-semibold mb-1">Site List</h1>
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
                  fill="#e8eaed"
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
                  fill="#e8eaed"
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

      <div className="flex justify-between items-center pb-8">
        <div>
          DROPDOWN
        </div>

        <div className="w-[30%] h-10">
          <Input className="bg-transparent" />
        </div>
      </div>

      <div className="border border-2 rounded-md">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-x-2">
            <p className="text-secondary">Showing</p>
            <span className="border border-black p-1 rounded-md">63</span>
            <span>/</span>
            <span className="border border-black p-1 rounded-md">1280</span>
            <p className="text-secondary">Results</p>
          </div>

          <div>
            Dropdown
          </div>
        </div>

        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Jobs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map(user => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center">
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-10 h-10 rounded-lg"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-secondary">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {user.jobs.map(job => (
                      <button key={job} className="w-6 h-6 rounded-full bg-primary text-white">
                        {job}
                      </button>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-start space-x-2 gap-x-5">
                    <Link className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md" to="/details" >
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
    </div>
  );
};
