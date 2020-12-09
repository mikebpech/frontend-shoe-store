import React, { useCallback } from 'react';

const MAX_SIZE = 50;
const INITIAL_STATE = {
  logs: []
}

const useStockLogs = (initialState = INITIAL_STATE) => {
  const [logs, setLogs]       = React.useState(initialState.logs)

  const handleNewLog = useCallback((log) => {
    setLogs(oldLogs => {
      if (oldLogs) {
        if (oldLogs.length >= MAX_SIZE) {
          oldLogs.splice(MAX_SIZE/2, MAX_SIZE);
        }
  
        return setLogs([log, ...oldLogs]);
      }
    });
  });

  return { handleNewLog, logs };
}

export default useStockLogs;