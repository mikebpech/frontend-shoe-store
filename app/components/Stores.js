import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

const Stores = ({ inventory }) => {
  return (
    <StoreWrap>
      <div className="store-list">
        { inventory && Object.entries(inventory).map(([store, stock]) => (
          <Store key={store} className="store">
            <h2>{store}</h2>
            <ul className="inventory">
              {Object.entries(stock).map(([itemName, itemCount]) => (
                <li key={`${store}-${itemName}`} className="inventory-item">
                  <h4>{itemName}</h4>
                  <CountUp 
                    className={itemCount < 5 ? 'low-stock' : itemCount > 80 ? 'high-stock' : ''}
                    end={itemCount}
                  />
                </li>
              ))}
            </ul>
          </Store>
        )) }
      </div>
    </StoreWrap>
  )
}

export default Stores;

const StoreWrap = styled.div`
  width: 100%;
  
  h2 {
    margin-bottom: 20px;
  }

  .store-list {
    display: grid;
    grid-gap: 40px 80px;
    grid-template-columns: repeat(auto-fit, 360px);
  }
`

const Store = styled.div`
  width: 100%;
  margin-bottom: 20px;

  ul.inventory {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 10px;

    li.inventory-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 24px;
        font-weight: 500;
      }

      span.low-stock {
        font-weight: 700;
        color: firebrick;
        border-bottom: 2px solid firebrick;
        padding: 0 5px;
      }

      span.high-stock {
        font-weight: 700;
        color: green;
      }
    }
  }
`