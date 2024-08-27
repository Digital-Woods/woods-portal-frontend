function useMe() {
  const { isAuthorized } = useAuth();
  let response = null;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me_data"],
    queryFn: Client.users.me,
    staleTime: 10000,
    // queryFn: async () => Client.users.me,
    // enabled: isAuthorized
  });

  const getMe = () => {
    refetch();
  };

  if (data) {
    response = data.data;
    const portalSettings = response.portalSettings;
    localStorage.setItem(env.AUTH_PORTAL_KEY, JSON.stringify(portalSettings));
    localStorage.setItem(env.AUTH_USER_KEY, JSON.stringify(response));
  }

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
