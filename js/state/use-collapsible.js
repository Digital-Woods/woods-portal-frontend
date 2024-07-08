
const { atom, useRecoilState } = Recoil;

const isCollapsibleState = atom({
  key: "isCollapsibleState",
  default: false,
});

function useCollapsible() {
  const [isCollapsible, setisCollapsible] = useRecoilState(isCollapsible);

  return {
    isCollapsible,
    setisCollapsible,
  };
}
