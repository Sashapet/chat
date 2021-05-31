import styled from 'styled-components'

export default styled.div`
    background-color: ${props=>(props.friend ? props.theme.secondary : props.theme.primaryDash)};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: ${props=>(props.friend ? '0' : '20px')};
    ${props=>(props.friend && 'border-bottom-right-radius: 20px')};
`