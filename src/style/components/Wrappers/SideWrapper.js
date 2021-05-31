import styled, {css} from 'styled-components'

export default styled.div` 
    position: relative;
    width: ${props => (props.left ? '40%' : '60%')};
    background-color: ${props => (props.left ? props.theme.primary : props.theme.primaryDash)};
    ${props => (props.left ? 'border-top-left-radius' : 'border-top-right-radius')}:20px;
    ${props => (props.left ? 'border-bottom-left-radius' : 'border-bottom-right-radius')}:20px;
    display: flex;
    flex-direction: column;
    ${props => (props.left ? 'border-right' : 'border-left')} : 1px rgba(0,0,0,0.1) solid;

    @media only screen and (max-width: 780px) {
        border-right:none;
        border-left:none;
        ${props => (!props.view ? 
            css `
            display:none;`
        :  css `
            width:100%;
            border-top-left-radius:20px;
            border-bottom-left-radius:20px;
            border-top-right-radius:20px;
            border-bottom-right-radius:20px;
         `
         )}
    }
`;
