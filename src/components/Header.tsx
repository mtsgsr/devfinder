import React from "react";
import { Github, Monitor, Moon, Sun } from "lucide-react";

const Header = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onSysPreference = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  React.useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onSysPreference();
        break;
    }
  }, [theme]);

  return (
    <header className="m-auto my-8 flex w-full max-w-2xl justify-between">
      <a href="/" className="flex items-center gap-2">
        <Github size={20} />
        <h1 className="text-2xl">devfinder</h1>
      </a>
      <button
        type="button"
        onClick={handleClick}
        title={
          theme === "system"
            ? "Cor do sistema"
            : theme === "dark"
            ? "Modo escuro"
            : "Modo claro"
        }
      >
        {theme === "system" ? (
          <Monitor size={25} />
        ) : theme === "dark" ? (
          <Moon size={25} />
        ) : (
          <Sun size={25} />
        )}
      </button>
    </header>
  );
};

export default Header;
