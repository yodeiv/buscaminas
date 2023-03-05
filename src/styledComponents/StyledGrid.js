import styled from "styled-components";
const StyledGrid = styled.div`
  display: grid;
  /*justify-content: center; justify-items: center*/
  grid-template-columns: repeat(${(props) => props.columns}, 30px);
  grid-auto-rows: 30px;
  grid-gap: 0;
`;
export default StyledGrid;
