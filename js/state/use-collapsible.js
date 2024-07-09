
const { atom, useRecoilState } = Recoil;

const isCollapsibleState = atom({
  key: "isCollapsibleState",
  default: false,
});

function useCollapsible() {
  const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(isCollapsibleState);

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
  };
}
