const { useQuery } = ReactQuery;

const TnstackQuery = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
        </div>
      )}
    </div>
  );
};
