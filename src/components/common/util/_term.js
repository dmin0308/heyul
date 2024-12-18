import styled from "styled-components";

export const TermsContainer = styled.div`
  max-width: 636px;
  margin: 0 auto;
  padding: 24px 0 32px 0;
  color: var(--default);
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid #222;

  .span-text{
    color: #24c57a;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: column;
  margin-bottom: 16px;

  .title-text {
    font-weight: 600;
    font-size: 18px;
  }
  label{
  line-height:0.9;
  }

  .sub-text {
    font-size: 14px;
    color: #666;
    display: inline-block;
    word-break: keep-all;
    line-height:1.2;
  }

  input[type="checkbox"] {
    display: none; /* 기본 체크박스 숨김 */
  }
`;

export const TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TermsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input[type="checkbox"] {
    display: none; /* 기본 체크박스 숨김 */
  }

  span {
    font-size: 14px;
    font-weight: 400;

    &.required {
      color: #24c57a;
      margin-left: 2px;
    }
    &.optional-text {
      color: #999;
      margin-left: 2px;
    }
    &.required-text {
      color: #24c57a;
      font-weight:300;
      margin-left: 2px;
    }

    label {
      display: flex;
      align-items: center;
      margin-right: 8px;

      input[type="checkbox"] {
        margin-right: 12px;
        width: 16px;
        height: 16px;
        display: none;
      }
    }
  }

  .terms-link {
    font-size: 14px;
    font-weight:500;
    color: #24c57a;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
