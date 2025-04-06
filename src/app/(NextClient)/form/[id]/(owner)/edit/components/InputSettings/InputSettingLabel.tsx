import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import React, { useContext } from "react";

type TProps = {
      children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const InputSettingLabel = (props: TProps) => {
      const { children, ...rest } = props;
      const { theme } = useContext(ThemeContext);

      return (
            <>
                  <label style={{ color: theme === "dark" ? "#7291e6" : "var(--color-main)" }} {...rest} className=" font-bold">
                        {children}
                  </label>
            </>
      );
};

export default InputSettingLabel;
