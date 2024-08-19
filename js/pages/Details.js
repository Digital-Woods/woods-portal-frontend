const Details = ({ path, id }) => {
  const [item, setItems] = useState(null);
  const [sortItems, setSortItems] = useState([]);
  const [associations, setAssociations] = useState({});
  const [personalInfo, setPersonalInfo] = useRecoilState(profileState);

  console.log(personalInfo);

  const { error, isLoading } = useQuery({
    queryKey: ["DetailsData", path, id],
    queryFn: async () =>
      await Client.objects.byObjectId({
        path,
        objectId: id,
        hubId: personalInfo.hubId,
        templatename: personalInfo.templatename,
      }),
    onSuccess: (data) => {
      if (data.data) {
        const finalData = JSON.parse(
          JSON.stringify(sortData(data.data, "details"))
        );
        setSortItems(finalData);
      }
      if (data.data.associations) {
        const finalData = data.data.associations;
        setAssociations(finalData);
      }
      setItems(data.data);
    },
  });

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-white bg-lightblue text-2xl font-semibold">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="h-full dark:bg-dark-200 w-[100%] flex p-6">
      <div className="w-[calc(100%_-350px)] pr-4">
        {isLoading && !item && <div className="loader-line"></div>}

        <DetailsHeaderCard
          bgImageClass="bg-custom-bg"
          plantName="South Plant"
          date="17/01/2024"
          serviceName="AquaFlow Service"
          following="Following"
          path={path}
          item={item}
        />

        {(path === "/sites" || path === "/assets") && <DetailsMapsCard />}

        {path === "/jobs" ? (
          <div className="col-span-4">
            <DetailsTable item={item} path={path} />
            <DetailsView sortItems={sortItems} />
          </div>
        ) : (
          <DetailsView sortItems={sortItems} />
        )}
      </div>

      <div className="w-[350px]">
        <div className="max-h-[calc(100vh_-120px)] scrollbox pr-2 fixed w-[350px]">
          {associations &&
            Object.entries(associations).map(([key, association]) => (
              <DetailsAssociations key={key} association={association} />
            ))}
        </div>
      </div>
    </div>
  );
};
