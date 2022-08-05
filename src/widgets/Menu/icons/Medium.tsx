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