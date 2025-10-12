"use client";
import React, { SetStateAction, createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
      theme: "dark" | "light";
      setTheme: React.Dispatch<SetStateAction<"dark" | "light">>;
      onReset: () => void
};

export const ThemeContext = createContext<ThemeContextType>({
      theme: "dark",
      setTheme: () => {},
      onReset: () => {}
});

type TProps = {
      children: React.ReactNode;
};

const ThemeProvider = (props: TProps) => {
      const { children } = props;

      const [theme, setTheme] = useState<"dark" | "light">(
            typeof window === "undefined" ? "dark" : ((localStorage.getItem("theme") || "light") as "dark" | "light"),
      );

      useEffect(() => {
            if (typeof window === "undefined") return;
            localStorage.setItem("theme", theme);

            if (theme === "dark") {
                  document.body.classList.remove("light");
                  document.body.classList.add("dark");
                  return;
            }

            document.body.classList.add("light");
            document.body.classList.remove("dark");
            return () => {};
      }, [theme]);

      const onReset = () => {
            if (theme === "light") {
                  document.body.style.setProperty("--border-color-input", "rgb(141 145 151 / 27%)");
                  document.documentElement.style.backgroundColor = "";
                  document.body.style.setProperty("--color-section-theme", "#fefefe");
            } else {
                  document.body.style.setProperty("--border-color-input", "rgb(46 76 120 / 27%)");
                  document.documentElement.style.backgroundColor = "";
                  document.body.style.setProperty("--color-section-theme", "#16161e");
            }
      };
      useEffect(() => {
            onReset();
      }, [theme]);

      return <ThemeContext.Provider value={{ theme, setTheme, onReset }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
