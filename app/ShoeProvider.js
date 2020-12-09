import React, { useCallback, useEffect } from 'react';
import useNotify from './hooks/useNotify';
import useStockLogs from './hooks/useStockLogs';

export const ShoeContext = React.createContext();

const ShoeProvider = (props) => {
  const [incomingMessages, setIncomingMessages] = React.useState([]);
  const [inventory, setInventory]               = React.useState({});

  const { sendNotif } = useNotify();
  const { handleNewLog, logs } = useStockLogs();

  const receive = msg => {
    setIncomingMessages(messages => [...messages, msg]);
  }

  const saveToSession = useCallback((d) => {
    console.log(`Saving ${Object.keys(d).length} items to localstorage.`);

    const data = JSON.stringify(d);
    localStorage.setItem('inventory_data', data);
  });

  const getSessionData = useCallback(() => {
    console.log('Getting inventory from localstorage.');

    const items = localStorage.getItem('inventory_data');
    setInventory(JSON.parse(items));
  });

  useEffect(() => {
    if ((incomingMessages.length > 0 && incomingMessages.length % 10) === 0) {
      const copy = [...incomingMessages];
      setIncomingMessages([]);
      let obj = { ...inventory };
      for (let m of copy) {
        if (obj.hasOwnProperty(m.store)) {
          if (m.inventory === 0) {
            handleNewLog(`${m.store} has run out of ${m.model}`);
            sendNotif('warning', `${m.store} has run out of ${m.model}!`);
          } else if (m.inventory < 5) {
            handleNewLog(`${m.store} has ${m.inventory} ${m.model} left.`);
            sendNotif('info', `${m.store} is getting low (${m.inventory}) on model ${m.model}!`);
          }

          obj[m.store][m.model] = m.inventory;
        } else {
          obj[m.store] = { [m.model] : m.inventory }
        }
      }

      saveToSession(obj);
      setInventory(obj);
    }
  }, [incomingMessages]);
  
  useEffect(() => {
    getSessionData();

    const ws = new WebSocket('ws://localhost:8080/');
    ws.onmessage = e => {
      receive(JSON.parse(e.data));
    }
  }, []);

  return (
    <ShoeContext.Provider value={{ data : inventory, logs }}>
      {props.children}
    </ShoeContext.Provider>
  )
}

export default ShoeProvider;