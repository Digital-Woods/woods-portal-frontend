function useMe() {
  // const { isAuthorized } = useAuth();
  const isAuthorized = true;
  // const { data, isLoading, error, refetch } = useQuery(
  //   [API_ENDPOINTS.USERS_ME],
  //   Client.getProfileDetails.all,
  //   {
  //     enabled: isAuthorized,
  //   },
  // );
  let response = null;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await Client.getProfileDetails.all,
  });

  const getMe = () => {
    refetch();
  };

  if(data) response = data.data


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
