import React, { useCallback } from 'react';
import { NotificationManager } from 'react-notifications';

const INITIAL_STATE = {

}

const NOTIFICATION_TYPES = [
  "info",
  "success",
  "warning",
  "error"
];

const useNotify = (initialState = INITIAL_STATE) => {

  const sendNotif = useCallback((type, message) => {
    console.log('called')
    if (!NOTIFICATION_TYPES.includes(type)) {
      console.warn('Invalid notification type passed.');
      return;
    }

    NotificationManager[type](message, 'Stock Warning');
  });

  return { sendNotif };
}

export default useNotify;