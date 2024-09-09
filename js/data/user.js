function useMe() {
  if (isLivePreview()) {
    return {
      me: fakeTableData,
      isLoading: false,
      error: null,
      isAuthorized: null,
      getMe: null,
    };
  } else {
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
      setCookie(
        env.AUTH_PORTAL_KEY,
        JSON.stringify(portalSettings),
        env.COOKIE_EXPIRE
      );
      setCookie(env.AUTH_USER_KEY, JSON.stringify(response), env.COOKIE_EXPIRE);
    }

    return {
      me: response,
      isLoading,
      error,
      isAuthorized,
      getMe,
    };
  }
}

// function useLogout() {
//   const setAuthorization = useSetRecoilState(authorizationAtom);
//   const [logoutDialog, setLogoutDialog] = useRecoilState(logoutDialogState);

//   const mutation = useMutation({
//     mutationFn: Client.authentication.Logout,
//     onSuccess: () => {
//       localStorage.clear();
//       setAuthorization(null);
//       window.location.hash = "/login";
//       setLogoutDialog(false);
//     },
//     onError: (err) => {
//       console.error("Logout failed: ", err);
//     },
//   });

//   return {
//     logout: mutation.mutate,
//     isLoading: mutation.isLoading,
//     error: mutation.error,
//   };

function useLogout() {
  const setAuthorization = useSetRecoilState(authorizationAtom);
  const [logoutDialog, setLogoutDialog] = useRecoilState(logoutDialogState);

  const mutation = useMutation({
    mutationFn: Client.authentication.Logout,
    onSuccess: () => {
      removeAllCookies();
      setAuthorization(null);
      window.location.hash = "/login";
      setLogoutDialog(false);
    },
    onError: (err) => {
      console.error("Logout failed: ", err);
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
