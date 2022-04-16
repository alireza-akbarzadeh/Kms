import {createGlobalStyle} from "styled-components";
import "./style/index.css";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
  }


  a {
    text-decoration: none;
    color: inherit;
  }

  td, th {
    white-space: nowrap;
  }

  button {
    white-space: nowrap;
  }

  .border-t {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  .alignMent {
    display: inline-flex;
    align-items: center;
    gap: 8.2px;
  }

  input, textarea {
    font-family: 'Yekan', serif;
    font-size: 13px;
  }


  .underline:hover {
    text-decoration: underline;
  }

  .page-item {
    // border: 1px solid;
    padding: 5px 10px;
    border-radius: 50%;
    margin: 0 5px;
    list-style-type: none;
    width: 40px;
    height: 40px;
    text-align: center;
  }

  .pagination {
    display: flex;
    flex-direction: row;
  }

  .page-item:hover {
    background-color: rgba(128, 5, 216, 0.4);
    transition: all 0.2s ease-in-out;
  }

  .page-item:hover .page-link {
    color: #fff;
  }

  .page-link {
    text-align: center;
    margin-top: 4px;
    color: #707070;
    display: block;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .hidden {
    display: none;
  }

  .bock {
    display: block;
  }

  @media (max-width: 800px) {
    .mobile_size {
      display: block;
    }

    .default_size {
      display: none;
    }
  }

  @media (min-width: 800px) {
    .mobile_size {
      display: none;
    }

    .default_size {
      display: block;
    }
  }

  .h-full {
    height: 100%;
  }

  .w-full {
    width: 100%;
  }

  .max-w-full {
    max-width: 100%;
  }

  .Border_Error {
    border: 2px solid #f50 !important;
    border-radius: 5px;

    &:focus {
      outline: none !important;
    }
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inherit {
    color: inherit;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  .custom-calendar {
    box-shadow: 0 0.2em 1em rgba(156, 136, 255, 0.3);
    cursor: pointer;
  }

  .filter-calendar {
    margin: 0 5px;
  }

  .custom-today-day {
    color: #e67e22 !important;
    border: 1px solid #e67e22 !important;
  }

  .custom-today-day::after {
    visibility: hidden; /* hide small border under the text */
  }

  .pagination {
    flex-wrap: wrap;
  }

  .active-link {
    color: #fff;
  }

  .active-Item {
    background-color: rgba(128, 5, 216, 0.8);
    color: #fff;
  }

  .sideBar_fixed {
    position: fixed !important;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }

  /* width */
  &::-webkit-scrollbar {
    width: 5px;

  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 50px;
    width: 15px;

  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #322740;
    width: 15px;
  }

  /* Table */
  .modal-radius {
    .MuiDialog-paper {
      border-radius: 50px;
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  .modal-radius-dark {
    .MuiDialog-paper {
      border-radius: 50px;
      backdrop-filter: blur(10px);
    }
  }

  .purpleDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
    background-color: rgba(128, 5, 216, 0.9) !important;
    margin: 0 1px;
    color: #fff;
  }

  .orangeDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
    border: 2px solid rgba(219, 145, 60, 0.7) !important;
  }

  .yellowDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
    border: 2px solid rgba(228, 231, 36, 0.7) !important;
  }

  .navyBlueDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
    border: 2px solid rgba(52, 73, 94, 0.7) !important;
  }

  @media (max-width: 600px) {
    .MobileSize {
      display: block;
    }

    .DesktopSize {
      display: none;
    }
  }

  @media (min-width: 900px) {
    .MobileSize {
      display: none;
    }

    .DesktopSize {
      display: block;
    }
  }

  //react Select Box
  .React_select {

  }

  //  Text Editor
  .text-editor {
    width: 100%;
    margin: 0 auto;
    direction: ltr;
  }

  .ql-editor {
    min-height: 400px;
  }

  //  style related to Text Editor
  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-left {
    text-align: left;
  }
  
  
`;


export default GlobalStyle;
