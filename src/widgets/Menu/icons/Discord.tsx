import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <image
        href="data:image/png;base64,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"
        width="100%"
      /> 
    </Svg>
  );
};

export default Icon;
