const { atom, useRecoilState } = Recoil;

const routeState = atom({
  key: "routeState",
  default: [],
});

function useRoute() {
  const [routes, setRoutes] = useRecoilState(routeState);

  return {
    routes,
    setRoutes
  };
}
