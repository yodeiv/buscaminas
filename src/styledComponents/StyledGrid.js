import styled from "styled-components";
const StyledGrid = styled.div`
  top: 18px;
  display: grid;
  position: relative;
  justify-content: center; /*justify-items: center*/
  grid-template-columns: repeat(${(props) => props.columns}, 30px);
  grid-auto-rows: 30px;
  grid-gap: 0;
  margin: 0 auto;
  width: min-content;
  border-top: 4px solid #808080;
  border-left: 4px solid #808080;
  border-right: 4px solid #ffffff;
  border-bottom: 4px solid #ffffff;
  box-shadow: 0 0 0 6px #c6c6c6;
  &:after {
    content: "";
    position: absolute;
    border-bottom: 6px solid #808080;
    border-right: 6px solid #808080;
    border-left: 6px solid #ffffff;
    top: -16px;
    left: -16px;
    right: -16px;
    bottom: -16px;
    z-index: -1;
  }
`;
export default StyledGrid;
