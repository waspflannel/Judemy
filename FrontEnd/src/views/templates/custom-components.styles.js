import styled from "styled-components"
import { Link } from "react-router-dom"

export const InputField = styled.input`
    padding: 6px;
    border-radius: 3px;
    display: block;
    margin-bottom: 10px;
    width: 100%;
`

export const BigHeader = styled.h1`
    font-size: 50px;
`

export const InputLabel = styled.h2`
    font-size: 20px;
    margin: 0;
    margin-bottom: 5px;
`

export const MainButton = styled.button`
    padding: 6px 10px;
    border-radius: 6px;
    background-color: white;
`
export const HyperLinkMain = styled(Link)`
    color: white;
`