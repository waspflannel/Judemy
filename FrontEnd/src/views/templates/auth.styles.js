import styled from "styled-components";

export const AuthWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    display:flex;
    color: white;
`

export const AuthSectionWrapper = styled.div`
    width: ${props => `${props.$width}%`};
    background: ${props => props.$mainColour ? 'black' : 'white'};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: ${props => props.$display ? 'none' : 'flex'};
`