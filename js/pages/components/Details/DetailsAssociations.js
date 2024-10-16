const DetailsAssociations = ({ key, association, isActive, parentObjectTypeId, parentObjectRowId }) => {
  { console.log('key', key) }

  return (
    <Accordion className="mb-0 rounded-none" isActive={isActive}>
      <AccordionSummary>
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              className="dark:fill-white fill-black"
            >
              <path d="M140-100v-240h120v-160h200v-120H340v-240h280v240H500v120h200v160h120v240H540v-240h120v-120H300v120h120v240H140Zm240-560h200v-160H380v160ZM180-140h200v-160H180v160Zm400 0h200v-160H580v160ZM480-660ZM380-300Zm200 0Z" />
            </svg>
          </span>
          <span>
            {association.labels.plural}
            <span className="ml-2 px-2 py-1 rounded-md bg-lightblue text-white text-xs">
              {association.total}
            </span>
          </span>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className="flex flex-col py-2">
          {association.total === 0 ? (
            <div className="p-2 dark:bg-dark-300 bg-white rounded-md text-xs font-semibold dark:text-white">
              See the {association.labels.plural} associated with this record.
            </div>
          ) : (
            association.data &&
            association.data.length > 0 && (
              <div className="px-2 dark:bg-dark-300 bg-white rounded-md dark:text-white">
                {association.data.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 border dark:border-gray-600 p-2 rounded-md shadow-sm bg-white dark:bg-dark-500"
                  >
                    {sortData(item, 'associations').map(
                      (row) => (
                        <div key={row.label} className="py-2 flex">
                          <div className="text-xs font-semibold w-[100px]">
                            {/* {checkEquipmentsName(row.label, association.label)}: */}
                            {row.label}
                          </div>
                          <div className="text-xs text-gray-500 flex-1">
                            {/* {renderCellContent(
                              item[row.value],
                              item.id,
                              `/${association.featureName}`
                            )} */}
                            {renderCellContent(row.value, row)}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        {console.log('path', `${'cabins'}?objectTypeId=${association.objectTypeId}&parentObjectTypeId=${parentObjectTypeId}&parentObjectRowId=${parentObjectRowId}`)}
        {association.hasMore &&
          <div className="text-right mb-2">
            <Link
              className="text-lightblue font-bold border-input rounded-md"
              to={`/${'association'}?objectTypeId=${association.objectTypeId}&parentObjectTypeId=${parentObjectTypeId}&parentObjectRowId=${parentObjectRowId}`}
            >
              Show more
            </Link>
          </div>
        }
      </AccordionDetails>
    </Accordion>
  );
};
