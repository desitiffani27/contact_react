import {call, put} from 'redux-saga/effects';

import {Creators as ContactActions} from '../ducks/contact';
import api, {URI} from '../../services/api';

export function* contactRequest(action) {
  try {
    console.log('> contactRequest');
    console.log(action.payload);
    yield put(ContactActions.clearContact());
    
    const response = yield call(
      api.get,
      URI.CONTACT
    );
    console.log('> contactRequest response');
    console.log(response);
    yield put(
      ContactActions.getContactListSuccess(
        response.data.data,
        action.payload.contactOldList
      ),
    );
  } catch (err) {
    console.log(err);
    // if (err && err.response.status !== 404) {
    //   yield put(ContactActions.getContactListFailure(err.toString()));
    // }
  }
}

/**
 * Request create new contact
 */
export function* createContactRequest(action) {
  try {
    console.log('> createContactRequest');

    const id = action.payload.param.id;
    const param = {
      firstName: action.payload.param.firstName,
      lastName: action.payload.param.lastName,
      age: action.payload.param.age,
      photo: action.payload.param.photo,
    }
    
    const response = yield call(id != null ? api.put : api.post, URI.CONTACT + (id != null ? "/" + id : ''), param);
    yield put(ContactActions.postContactSuccess(param));
    console.log('save contact success')
    action.callback(param);
  } catch (err) {
    console.log(err);
    yield put(ContactActions.postContactFailure("Save contact error, please try again later"));
  }
}

/**
 * Request delete contact
 */
export function* deleteContactRequest(action) {
  try {
    console.log('> deleteContactRequest');
    console.log(action.payload.param)
    const response = yield call(api.delete, URI.CONTACT + 
      '/' 
      + action.payload.param.contactId);
    yield put(ContactActions.deleteContactSuccess([]));
    action.callback([]);
  } catch (err) {
    console.log(err);
    yield put(ContactActions.deleteContactFailure("Delete contact error, please try again later"));
  }
}
