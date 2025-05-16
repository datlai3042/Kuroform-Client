import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { Maximize, Minimize2 } from "lucide-react";
import React from "react";

type TProps = {
      onClick?: () => void;
      active?: boolean;
};

const ButtonExpand = (props: TProps) => {
      const { active, onClick } = props;

      return (
            <ButtonIcon
                  style={{ color: "var(--color-main)" }}
                  onClick={onClick}
                  content={"Mở thống kê"}
                  Icon={!active ? <Minimize2 /> : <Maximize />}
            ></ButtonIcon>
      );
};

export default ButtonExpand;
