import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export type CardHeaderProps = SpaceProps;

const CardHeader = styled.div<CardHeaderProps>`
  background-color : transparent;

  ${space}
`;

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
