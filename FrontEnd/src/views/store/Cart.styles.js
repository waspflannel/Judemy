import styled from "styled-components";

export const CartWrapper = styled.div`
    display: flex;

    h1{
        margin: 1vh 0;
        padding: 0;
    }

    p{
        margin: 0;
        margin-bottom: 10px;
    }
`

export const CartWrapperLeft = styled.div`
    width: 75vw;
    height: 82vh;
    padding: 4vh;
`

export const CartWrapperRight = styled.div`
    width: 25vw;
    background-color: black;
    color: white;
    height: 82vh;
    padding: 4vh;
`

export const CartWrapperTop = styled.div`
    height: 10%;
`

export const CartWrapperMiddle = styled.div`
    height: 70%;
`

export const CartWrapperBottom = styled.div`
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: end;
`

export const CourseCardParent = styled.div`
    height: 90%;
    overflow: auto;
    padding-right: 5px;
`

export const CourseCardWrapper = styled.div`
    background-color: black;
    color: white;
    padding: 4vh;
    margin-bottom: 4vh;
    height: 15vh;
    display: flex;
    position: relative;

    a{
        color: white;
        font-size: 20px;
    }
`

export const CourseCardWrapperLeft = styled.div`
    width: 78%;

    p{
        margin-top:10px;
        overflow: auto;
        max-height: 75%;
    }
`

export const CourseCardWrapperRight = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 2%;

    p{
        margin: 0;
    }
`

export const RemoveButtonWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`