import { Moon, Sun, SunMoon } from "lucide-react";
import { useEffect } from "react";
import { useTernaryDarkMode } from "usehooks-ts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ILightDarkModeSwitcher } from "./interface";

export const LightDarkModeSwitcher: React.FC<ILightDarkModeSwitcher> = ({ isMobile }) => {
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode();
  const theme: (typeof ternaryDarkMode)[] = ["light", "dark", "system"];

  const getThemeIcon = (mode: typeof ternaryDarkMode, width = "1.5rem") => {
    switch (mode) {
      case "light":
        return <Sun width={width} height="auto" />;
      case "dark":
        return <Moon width={width} height="auto" />;
      case "system":
        return <SunMoon width={width} height="auto" />;
    }
  };

  const getPredictedThemeDetails = (mode: typeof ternaryDarkMode) => {
    switch (mode) {
      case "light":
        return { label: "System", icon: <SunMoon width="1rem" height="auto" /> };
      case "system":
        return { label: "Dark", icon: <Moon width="1rem" height="auto" /> };
      case "dark":
        return { label: "Light", icon: <Sun width="1rem" height="auto" /> };
    }
  };

  useEffect(() => {
    isDarkMode ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  if (isMobile) {
    const { label, icon } = getPredictedThemeDetails(ternaryDarkMode);

    return (
      <div
        onClick={toggleTernaryDarkMode}
        className="flex items-center gap-2 text-base font-semibold text-text-darkGrey cursor-pointer"
      >
        Switch to {label} Mode
        {icon}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="DropdownMenuTrigger select-none p-2 rounded-md outline-none hover:bg-jumbotronLight dark:hover:bg-jumbotronDark justify-start items-center gap-2 inline-flex transition dark:text-whiteDefault">
        {getThemeIcon(ternaryDarkMode)}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 bg-surface-primary dark:bg-blackDefault dark:border-border-cardDark">
        {theme.map((mode) => (
          <DropdownMenuItem
            key={mode}
            className="flex gap-2 focus:bg-jumbotronLight dark:focus:bg-jumbotronDark dark:text-whiteDefault cursor-pointer transition capitalize"
            onClick={() => setTernaryDarkMode(mode)}
          >
            {getThemeIcon(mode, "1rem")}
            {mode}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
