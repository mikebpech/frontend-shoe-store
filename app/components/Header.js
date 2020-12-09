import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrap>
      <div className="interior">
        <h1>ALDO Inventory Manager</h1>
      </div>
    </HeaderWrap>
  )
}

export default Header;

const HeaderWrap = styled.header`
  height: 70px;
  display: flex;
  align-items: center;

  padding: 0 20px;

  .interior {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;

    h1 {
      font-weight: 700;
    }
  }
`