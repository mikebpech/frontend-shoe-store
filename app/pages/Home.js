import React, { useEffect, useState } from 'react';
import PageContainer from '../styles/PageContainer';
import FlipMove from 'react-flip-move';

import Stores from '../components/Stores';
import styled from 'styled-components';

const Home = ({ inventory }) => {
  useEffect(() => {
    console.log(inventory.data);
  }, [inventory]);

  return (
    <PageContainer>
      <PageWrap>
        <Logs>
          <h2>Logs</h2>
          <FlipMove>
            {inventory.logs && inventory.logs.map((log, i) => (
              <div key={i} className="log-item">
                {log}
              </div>
            ))}
          </FlipMove>
        </Logs>
        <Stores inventory={inventory.data} />
      </PageWrap>
    </PageContainer>
  )
}

export default Home;

const PageWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Logs = styled.div`
  width: 300px;
  margin-right: 50px;
  max-height: 100vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 10px;
  }

  .log-item {
    border-bottom: 2px solid salmon;
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 15px;
    font-weight: 600;
  }
`