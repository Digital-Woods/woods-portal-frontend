
const Home = () => {

  return (
    <div>
<Table className="border-2 border-flatGray rounded-md">
  <TableHeader>
  <div className="flex justify-around items-center py-7">
    <div className="flex items-center gap-x-2">
      <p className="text-secondary"> Showing  </p> <span className="border border-black p-1 text-black rounded-md">63</span> <span>/</span> <span className="border border-black p-1 text-black rounded-md">1280</span> <p className="text-secondary">Results</p>
    </div>
   </div>
    <TableRow>
      <TableHead> <p className="font-semibold">Name</p></TableHead>
      <TableHead className="flex items-center justify-end mr-[57%]"><p className="font-semibold">Jobs</p></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-lg"
        />
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-xs text-secondary ">johndoe@example.com</div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end space-x-2">
          <button className="w-6 h-6 rounded-full bg-primary text-white">1</button>
          <button className="w-6 h-6 rounded-full bg-primary text-white">2</button>
          <button className="w-6 h-6 rounded-full bg-primary text-white">3</button>
          <button className="w-6 h-6 rounded-full bg-primary text-white">1</button>
          <button className="w-6 h-6 rounded-full bg-primary text-white">2</button>
          <button className="w-6 h-6 rounded-full bg-primary text-white">3</button>
          <div className="pl-32 flex gap-x-16">
            <button className="border border-1 p-2 rounded-md">View</button>
            <button className="border border-1 p-2 rounded-md">Edit</button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

    </div>
  );
};
