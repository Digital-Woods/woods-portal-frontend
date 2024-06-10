const { useEffect, useState } = React;

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  //   const revertToSystemTheme = () => {
  //     localStorage.removeItem("theme");
  //     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //       setTheme("dark");
  //     } else {
  //       setTheme("light");
  //     }
  //   };

  return (
    <button className="js-theme-toggle" onClick={toggleTheme}>
      <span className="text-xl bg-red-700 dark:bg-red-400 p font-bold block dark:hidden text-slate-200">
        Light
      </span>
      <span className="text-xl bg-red-700 dark:bg-red-400 font-bold hidden dark:block text-slate-900">
        Dark
      </span>
    </button>
  );
};
