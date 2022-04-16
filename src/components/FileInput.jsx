
import styled from 'styled-components';
const FileInput = ({ children }) => {
    return (
        <CostomeFilUploader>
            {children}
        </CostomeFilUploader>
    )
}

export default FileInput

const CostomeFilUploader = styled.div`
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