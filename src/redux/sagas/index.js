import { all } from 'redux-saga/effects';
import clientList from './clientListSaga';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
    yield all([
      clientList(),
      loginSaga(),
      registrationSaga(),
      userSaga(),
      
    ]);
  }