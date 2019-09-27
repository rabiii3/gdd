import * as firebase from 'firebase/app';
import 'firebase/messaging';

const api = ({ jsonPost, secret, globalConfig }) => ({
  listen: ({ token, onMessage }) => {
    return new Promise((resolve, reject) => {

      const messaging = firebase.messaging();
      const sendTokenToServer = firebaseToken => jsonPost({ path: '/api/events/listen', headers: { ...secret(token), 'x-firebase-token': firebaseToken, 'x-tenant': globalConfig.tenant } });

      messaging.requestPermission().then(() => {

        messaging.getToken().then(currentToken => {
          if (currentToken) {
            messaging.onMessage(msg =>  {
              onMessage(JSON.parse(msg.data.payload));
            });
            resolve(sendTokenToServer(currentToken));
          } else {
            reject(new Error('No Instance ID token available. Request permission to generate one'));
          }
        }).catch(() => {
          reject(new Error('An error occurred while retrieving token'));
        });

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
          messaging.getToken().then(refreshedToken => {
            sendTokenToServer(refreshedToken);
          }).catch();
        });

      }).catch(() =>  {
        reject(new Error('Unable to get permission to notify.'));
      });
    });
  },
});

export default api;
