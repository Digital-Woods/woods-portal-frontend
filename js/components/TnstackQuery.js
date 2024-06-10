const { useQuery } = ReactQuery;

const TnstackQuery = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get("https://dummyjson.com/products");
      return response.data;
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
