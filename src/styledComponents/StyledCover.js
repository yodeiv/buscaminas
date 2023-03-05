import styled from "styled-components";
const StyledCover = styled.div`
  //background-color: green;
  position: absolute;
  width: ${(props) => {
    return props.win !== "face_neutral" ? props.dimension[1] * 30 + "px" : "0px";
  }};
  height: ${(props) => {
    return props.win !== "face_neutral" ? props.dimension[0] * 30 + "px" : "0px";
  }};
`;
export default StyledCover;
