const Pagination = ({ numOfPages, currentPage, setCurrentPage }) => {
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfButtons = [];
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfPages < 6) {
      tempNumberOfButtons = Array.from({ length: numOfPages }, (_, i) => i + 1);
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfPages];
    } else if (currentPage === 4) {
      const sliced = Array.from({ length: 5 }, (_, i) => i + 1);
      tempNumberOfButtons = [...sliced, dotsInitial, numOfPages];
    } else if (currentPage > 4 && currentPage < numOfPages - 2) {
      const sliced1 = [currentPage - 2, currentPage - 1];
      const sliced2 = [currentPage];
      tempNumberOfButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfPages,
      ];
    } else if (currentPage > numOfPages - 3) {
      const sliced = Array.from({ length: 4 }, (_, i) => numOfPages - 3 + i);
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      setCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      setCurrentPage(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfButtons);
  }, [currentPage, numOfPages]);

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        <li
          className={`cursor-pointer ${
            currentPage === 1 ? "text-gray-400" : ""
          }`}
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
        >
          Prev
        </li>
        {arrOfCurrButtons.map((data, index) => (
          <li
            key={index}
            className={`cursor-pointer px-2 py-1 ${
              currentPage === data ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
            onClick={() => setCurrentPage(data)}
          >
            {data}
          </li>
        ))}
        <li
          className={`cursor-pointer ${
            currentPage === numOfPages ? "text-gray-400" : ""
          }`}
          onClick={() =>
            setCurrentPage(
              currentPage < numOfPages ? currentPage + 1 : numOfPages
            )
          }
        >
          Next
        </li>
      </ul>
    </div>
  );
};
