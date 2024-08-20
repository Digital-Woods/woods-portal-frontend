function useMe() {
  const { isAuthorized } = useAuth();
  let response = null;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await Client.getProfileDetails.all,
  });

  const getMe = () => {
    refetch();
  };

  if (data) response = data.data;

  return {
    me: response,
    isLoading,
    error,
    isAuthorized,
    getMe,
  };
}

function useLogout() {
  localStorage.clear();
}
