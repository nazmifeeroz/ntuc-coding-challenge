import React from 'react'
import styled from 'styled-components'

const ArrowDown = () => {
  return (
    <StyledSvg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#565656" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </StyledSvg>
  )
}

const StyledSvg = styled.svg`
  transform: rotate(180deg) translateY(-5px);
`

export default ArrowDown
