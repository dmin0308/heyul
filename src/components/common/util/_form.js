import styled from "styled-components";

// FormContainer
export const FormContainer = styled.div`
  max-width: 615px;
  margin: 0 auto;
  color: #222;
  font-size: 16px;
  
  .submit-btn {
  background-color: var(--primary);
  color: #fff;
  border-color:transparent;

  &:hover {
    border-color: var(--primary);
    background-color: #fff;
    color: var(--primary);
  }
  
  }
`;

// Signdiv
export const Signdiv = styled.div`
    span {
    color: var(--primary);
  }
`;

// Title
export const Title = styled.h2`

`;

// Form
export const Form = styled.form`
  padding-top:2rem;
  border-top:2px solid #222;
  
  label{
    span{
      color : var(--primary);
    }
  }
`;

// FormGroup
export const FormGroup = styled.div`

.radiogroup{
  padding: 1rem 0;
}
input[type="radio"] {
    display: none;
}

&.enter-group {
    flex-wrap: nowrap;
    .enter-field {
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 1rem 1.5rem;

      .enter-input {
        display: block;
        flex: 1;
        border: none;
        font-size: 16px;
        padding: 0;

        &:focus {
          outline: none;
        }
      }

      .dropdown-wrapper {
        margin-left: auto;
        position: relative;
        width: 100%;

        button {
          background-color: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          width:100%
          justify-content: space-between;
        }

        ul {
          position: absolute;
          top: 100%;
          left: 0;
          list-style: none;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0;
          margin: 4px 0 0;
          width: 100%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 10;

          li {
            padding: 8px 12px;
            cursor: pointer;

            &:hover {
              background-color: #f0f0f0;
            }
          }
        }
      }
    }
  }

  .genderSpan {
    color: #222;
    font-size: 14px;
    font-weight:400;
  }
`;

// Label
export const Label = styled.label``;

// Input
export const Input = styled.input`
  color:var(--default-btn);
  padding: 1rem 1.5rem;
  border:1px solid #ccc;
  border-radius: 6px;
  &::placeholder{
    color:#bbb;
    font-weight:300;
  }
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

// Checkbox
export const Checkbox = styled.input``;

// Button
export const Button = styled.button`
width:100%;
height:58px;
padding: 1rem 0;
border:1px solid #ccc;
background-color: #fff;
color:#bbb;
border-radius: 6px;
font-weight:300;
cursor: pointer; /* 클릭 가능 */
// transition: background-color 0.3s ease; 
    &:hover {
    background-color: var(--primary); /* 호버 시 배경색 */
    color: #fff;
    border-color:var(--primary);
  }

  &:active {
    background-color: #ccc; /* 클릭 시 배경색 */
  }
  &.adbtn{
  border-color:var(--primary);
  color: var(--primary);
  path{
    stroke: var(--primary);
  }
  &:hover {
    color: #fff;
    border-color: #fff;

    path {
      stroke: #fff; // 버튼 호버 상태에서 path의 stroke 변경
    }
}  
`;

// ErrorMessage
export const ErrorMessage = styled.span`
  color: var(--color--discount);
  padding-left:0.5rem; 
  margin-top:0.5rem;
`;

// AtSymbol
export const AtSymbol = styled.span`
  font-size: 16px;
  color: #66666;
  display: inline-block;
  padding-right:0.5rem;
`;

// DropdownButton
export const DropdownButton = styled.button`
  flex-shrink: 0;
  font-size: 16px;
  font-weight:300;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:after {
    content: "▼";
    font-size: 12px;
    margin-left: 8px;
    color: #666;
  }

  &:hover {
    border-color: green;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;

    &:after {
      margin-left: 4px;
    }
  }
`;

// DropdownMenu
export const DropdownMenu = styled.ul`
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
`;

// DropdownItem
export const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
