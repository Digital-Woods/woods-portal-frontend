function useMe() {
  const { isAuthorized } = useAuth();
  let response = null;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: Client.users.me,
    // enabled: isAuthorized
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
  window.location.hash = "/login";
}
