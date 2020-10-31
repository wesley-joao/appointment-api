import variables from '../envVariablesConfig'
import admin from 'firebase-admin';
import serviceAccount from './firebase-admin-sdk-config.json';

export const adminConnection = {
  connect: () => {
    try {          
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: variables.DATABASE_URL,
      });
    } catch (error) {
      console.log(error)
    }
  }
}
