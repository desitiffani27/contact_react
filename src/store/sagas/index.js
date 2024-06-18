import {all, takeLatest, takeEvery} from 'redux-saga/effects';

import {Types as ContactTypes} from '../ducks/contact';

import {
  contactRequest, 
  createContactRequest, 
  deleteContactRequest
} from './contact';

export default function* rootSaga() {
  return yield all([
    takeLatest(ContactTypes.GET_CONTACT_LIST_REQUEST, contactRequest),
    takeLatest(ContactTypes.POST_CONTACT_REQUEST, createContactRequest),
    takeLatest(ContactTypes.DELETE_CONTACT_REQUEST, deleteContactRequest)
  ]);
}
