import styled, {css} from 'styled-components'

export default styled.h3`
    font-family: 'Nunito', sans-serif;
    padding: ${props=>!props.login && '10px;'};
    color: ${props=>((props.friend || props.login) ? '#fff' : '#000')};
    ${props => (props.italic && 'font-style: italic;')};
    font-size: ${props => (props.profile ? '20px': props.login ? '25px' : '15px')};
    font-weight: 800;
    word-break: break-word;
    overflow-wrap: break-word;
    ${props => (props.italic && 'font-size: 18px;')};

    ${props => (props.dropdown && css `
        font-weight: bolder;
        padding:0;
        margin-left: 10px;
        color:#000;
        transition: 0.5s;
    `
    )};
    ${props=>(props.error && css`
        font-size: 12px;
        color:red;
    `)}
    ${props=>(props.middleError && css`
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%); 
        font-size: 30px;
        color:#000;
    `)}

    @media only screen and (max-width: 350px) {
        ${props => (props.chat && css`
           font-size: 12px;
           padding:7px;
        ` )}
    }
`
