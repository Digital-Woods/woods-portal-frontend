
const Home = () => {

  return (
    <div>
    <Table className="border-2 border-flatGray rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Jobs</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-lg"
            />
          </TableCell>
          <TableCell>
            <div>
              <div className="font-semibold">John Doe</div>
              <div className="text-xs text-secondary">johndoe@example.com</div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-3">
              <button className="w-6 h-6 rounded-full bg-primary text-white">1</button>
              <button className="w-6 h-6 rounded-full bg-primary text-white">2</button>
              <button className="w-6 h-6 rounded-full bg-primary text-white">3</button>
              <button className="w-6 h-6 rounded-full bg-primary text-white">4</button>
              <button className="w-6 h-6 rounded-full bg-primary text-white">5</button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-start space-x-2 gap-x-5">
              <button className="border border-1 hover:bg-black hover:text-white px-2 py-1 rounded-md ">View</button>
              <button className="border border-1  hover:bg-black hover:text-white px-2 py-1 rounded-md">Edit</button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  
  );
};
