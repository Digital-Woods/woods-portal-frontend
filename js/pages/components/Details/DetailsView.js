const DetailsView = ({ sortItems }) => {
  return (
    <div className="p-3 dark:bg-dark-300 bg-white rounded-md mt-5 dark:text-white">
    {sortItems.length > 0 &&
      sortItems.map((value, index) => (
        <div
          key={value.name}
          className={`py-2 flex ${
            index === sortItems.length - 1 ? "" : ""
          }`}
        >
          <div className="text-sm font-semibold w-[200px]">
            {value.label}:
          </div>
          <div className="text-sm text-gray-500 ">
            {renderCellContent(value.value)}
          </div>
        </div>
      ))}
  </div>
  );
};
