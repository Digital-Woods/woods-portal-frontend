const { atom, useRecoilState } = Recoil;

const themeModeState = atom({
  key: "themeModeState",
  default: localStorage.theme,
});

function useTheme() {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  return {
    themeMode,
    setThemeMode
  };
}
