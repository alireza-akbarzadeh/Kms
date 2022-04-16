import styled from "styled-components";
import {Paper, Autocomplete} from "@mui/material";
import {CoreBTN} from "core";

const FormContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 570px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;

  form {
    width: 100%;
  }

  a {
    margin: 0 6px;
  }
`;

const FormControl = styled.div`
  margin: 10px 0;
  width: 100%;

  input.left_Radius {
    border-radius: 20px 0 20px 20px;
  }

  input.right_Radius {
    border-radius: 20px 20px 20px 0;
  }

  textarea {
    resize: none;
    padding: 8px;
  }

  label {
    margin-bottom: 10px;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  border: solid 2px #a0a3a5;
  background-color: transparent;

  &:focus {
    border: 2px solid #322740;
  }
`;
const LogInBTN = styled(CoreBTN)`
  width: 100%;
  padding: 14px 0;
  font-size: 16px;
`;
const ERROR = styled.p`
  color: red;
  font-weight: 600;
  font-size: 14px;
`;

const FormBG = styled(Paper)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({isMobile}) => isMobile ? "calc(100vh - 200px)" : "80vh"};
  margin: ${({isMobile}) => isMobile ? "50px auto" : "0"}
`;
const ImageControl = styled.div`
  position: relative;
  width: 100%;
  height: 999px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h3 {
    position: absolute;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
  }
`;
const Divider = styled.div`
  border: 1px solid #707070;
  width: calc(100% - 150px);
  margin: 0 7px;
`;
const DropDown = styled(Autocomplete)`
  button {
    width: 150px;
  }

  input {
    border-radius: 25px 0 25px 25px;
  }
`;
const FileInput = styled.div`
  margin: 10px auto;
  text-align: center;

  .wrap-custom-file {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    margin: 0 0.5rem 1rem;
    text-align: center;

    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 2px;
      overflow: hidden;
      opacity: 0;
    }

    label {
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
      padding: 0 0.5rem;
      cursor: pointer;
      background-color: #322740;
      border-radius: 100%;
      -webkit-transition: -webkit-transform 0.4s;
      -moz-transition: -moz-transform 0.4s;
      -ms-transition: -ms-transform 0.4s;
      -o-transition: -o-transform 0.4s;
      transition: transform 0.4s;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        display: block;
        margin-top: 2rem;
        font-size: 1.4rem;
        color: #777;
        -webkit-transition: color 0.4s;
        -moz-transition: color 0.4s;
        -ms-transition: color 0.4s;
        -o-transition: color 0.4s;
        transition: color 0.4s;
      }

      .fa {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        -webkit-transform: translatex(-50%);
        -moz-transform: translatex(-50%);
        -ms-transform: translatex(-50%);
        -o-transform: translatex(-50%);
        transform: translatex(-50%);
        font-size: 1.5rem;
        color: lightcoral;
        -webkit-transition: color 0.4s;
        -moz-transition: color 0.4s;
        -ms-transition: color 0.4s;
        -o-transition: color 0.4s;
        transition: color 0.4s;
      }

      &:hover {
        -webkit-transform: translateY(-1rem);
        -moz-transform: translateY(-1rem);
        -ms-transform: translateY(-1rem);
        -o-transform: translateY(-1rem);
        transform: translateY(-1rem);

        span,
        .fa {
          color: #333;
        }
      }

      &.file-ok {
        background-size: cover;
        background-position: center;

        span {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0.3rem;
          font-size: 1.1rem;
          color: #000;
          background-color: rgba(255, 255, 255, 0.7);
        }

        .fa {
          display: none;
        }
      }
    }
  }
`;
export {
    FormContainer,
    FormControl,
    LogInBTN,
    Input,
    ERROR,
    FormBG,
    ImageControl,
    Divider,
    DropDown,
    FileInput,
};
