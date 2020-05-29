import React from "react"
import styled from "styled-components/macro"

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: clamp(2.1rem, 3.5vw, 3.2rem);
  color: #c1d8e8;
  letter-spacing: 0.055em;
  /* font-variation-settings: "opsz" 19.9989938964844, "GRAD" 421, "YAXS" 409; */
  /* font-weight: 638; */
  font-weight: 500;
`

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  margin-bottom: 2vh;
`

export function Header() {
  return (
    <StyledHeader>
      <Title>Emoji Memory</Title>
    </StyledHeader>
  )
}
