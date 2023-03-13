import styled from "styled-components";
const StyledCover = styled.div`
  /* background-color: green; */
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 103px;
  width: ${(props) => {
    return props.win !== "face_neutral" ? props.dimension[1] * 30 + "px" : "0px";
  }};
  height: ${(props) => {
    return props.win !== "face_neutral" ? props.dimension[0] * 30 + "px" : "0px";
  }};
  z-index: 1;
`;
export default StyledCover;
