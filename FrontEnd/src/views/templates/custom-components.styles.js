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

export const HyperLinkButton = styled(Link)`
    color: black;
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 6px;
    background-color: white;
`

export const CustomTextArea = styled.textarea`
    width: 300px;
    height: 100px;
    margin: 20px 0;
`