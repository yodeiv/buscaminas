import styled from "styled-components";
const StyledHeader = styled.div`
  top: 12px;
  display: flex;
  width: ${(props) => {
    return `${(props.size < 7 ? 7 : props.size) * 30}px`;
  }};
  justify-content: space-around;
  background-color: rgb(198, 198, 198);
  margin: 0px auto;
  border-style: solid;
  border-width: 4px;
  border-color: rgb(128, 128, 128) rgb(255, 255, 255) rgb(255, 255, 255) rgb(128, 128, 128);
  position: relative;
  box-shadow: rgb(198 198 198) 0px 0px 0px 6px;
  &:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 6px;
    border-color: #ffffff #808080 #808080 #ffffff;
    top: -16px;
    left: -16px;
    right: -16px;
    bottom: -16px;
    z-index: -1;
  }
`;
export default StyledHeader;
