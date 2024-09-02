const { atom, useRecoilState } = Recoil;

const authorizationAtom = atom({
  key: "authorizationAtom",
  default: checkHasAuthToken(),
});

function useAuth() {
  const [isAuthorized, setAuthorized] = useRecoilState(authorizationAtom);

  return {
    setToken: setAuthToken,
    getToken: getAuthToken,
    isAuthorized,
    authorize(token) {
      setAuthToken(token);
      setAuthorized(true);
    },
    unauthorize() {
      setAuthorized(false);
      removeAuthToken();
    },
  };
}
