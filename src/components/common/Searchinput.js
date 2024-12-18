import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 검색 버튼 아이콘
const svgSearch = encodeURIComponent(`
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z" stroke="#222222" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`);

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  max-width:250px;
  width:25vw;
  border: 1px solid ${props => (props.focused || props.hover ? '#24C57A' : 'var(--color--stoke)')};
  border-radius: 40px;
  padding: 0px 16px;
  transition: border-color 0.3s;
  background: ${props => (props.focused || props.hover ? '#F5FAF9' : 'transparent')};
`;

const SearchInput = styled.input`
  flex: 1;
  width: calc(100% - 16px);
  border: none;
  outline: none;
  font-size: 16px;
  font-weight:200;
  line-height: 16px;
  padding: 9.5px 0;
  border-radius: 40px;
  background: transparent;

  &::-webkit-input-placeholder {
    color: #ccc;
  }
  &:-ms-input-placeholder {
    color: #ccc;
  }
  &::-ms-input-placeholder {
    color: #ccc;
  }
`;

const SearchButton = styled(Link)`
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-left: -16px;
  outline: none;
  color: var(--color--text-primary);

  &:after {
    content: url("data:image/svg+xml,${svgSearch}");
    display: inline-block;
  }
  
  color: ${props => (props.hover ? '#24C57A' : 'var(--color--text-primary)')};
`;

const SearchBar = ({ placeholder }) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [hover, setHover] = useState(false); // hover 상태 추가

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <SearchWrapper
      focused={focused}
      hover={hover} // hover 상태 전달
      onSubmit={handleSubmit}
      onMouseEnter={() => setHover(true)}  // 마우스가 올라갔을 때 hover 상태 변경
      onMouseLeave={() => setHover(false)} // 마우스가 떠날 때 hover 상태 변경
    >
      <SearchInput
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (query.trim()) {
              window.location.href = `/search?query=${encodeURIComponent(query.trim())}`;
            }
          }
        }}
      />
      <SearchButton 
        to={`/search?query=${encodeURIComponent(query.trim())}`}
        hover={hover} // hover 상태 전달
      />
    </SearchWrapper>
  );
};

export default SearchBar;
