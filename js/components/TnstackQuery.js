const { useQuery } = ReactQuery;

const TnstackQuery = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await Client.products.all({}, null, 1);
      return response;
    },
  });

  return (
    <div className="text-dark dark:text-light">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {data.products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
