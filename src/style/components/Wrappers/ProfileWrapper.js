import styled, {css} from 'styled-components'

export default styled.div`
    min-height: 92px;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
    display: flex;
    align-items: center;
    justify-content: ${props=>props.profile ? 'center' : 'flex-start'};
    padding-left: 3%;
    cursor: pointer;

    ${props=>props.contact && css`
        min-height : 0px;
        padding-top : 20px;
        padding-bottom : 20px;
        border-bottom : none;
        padding-left : 0;
    `}
`