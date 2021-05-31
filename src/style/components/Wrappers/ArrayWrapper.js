import styled from 'styled-components'

export default styled.div`
    flex-grow: 1;
    overflow: auto;
    min-height: 0;
    width: 100%;
    margin-bottom: ${props=>props.messages ? '59px' : '60px'};
    margin-bottom: ${props=>props.profile && '20px'};
    background-color: ${props=>props.messages ? '#fff' : '#004bc4'};
    background-color: ${props=>props.profile && props.theme.primaryDash};
`

