
const { atom, useRecoilState } = Recoil;

const isCollapsibleState = atom({
  key: "isCollapsibleState",
  default: false,
});

const isOpenState = atom({
  key: "isOpenState",
  default: false,
});

function useCollapsible() {
  const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(isCollapsibleState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(isOpenState);

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarOpen,
    setSidebarOpen,
  };
}
