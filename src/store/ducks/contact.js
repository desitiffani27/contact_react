import Immutable from 'seamless-immutable';

export const Types = {
  GET_CONTACT_LIST_REQUEST: 'contact/GET_CONTACT_LIST_REQUEST',
  GET_CONTACT_LIST_SUCCESS: 'contact/GET_CONTACT_LIST_SUCCESS',
  GET_CONTACT_LIST_FAILURE: 'contact/GET_CONTACT_LIST_FAILURE',

  POST_CONTACT_REQUEST: 'contact/POST_CONTACT_REQUEST',
  POST_CONTACT_SUCCESS: 'contact/POST_CONTACT_SUCCESS',
  POST_CONTACT_FAILURE: 'contact/POST_CONTACT_FAILURE',

  DELETE_CONTACT_REQUEST: 'contact/DELETE_CONTACT_REQUEST',
  DELETE_CONTACT_SUCCESS: 'contact/DELETE_CONTACT_SUCCESS',
  DELETE_CONTACT_FAILURE: 'contact/DELETE_CONTACT_FAILURE',

  CLEAR_CONTACT_LIST: 'product/CLEAR_CONTACT_LIST',
};

const initialState = Immutable({
  loading: false,
  error: false,
  errorMessage: null,
  totalPages: null,
  contactList: [],
  contactOldList: [],
});

export const Creators = {
  getContactListRequest: (
    contactOldList,
  ) => ({
    type: Types.GET_CONTACT_LIST_REQUEST,
    payload: {contactOldList}
  }),

  getContactListSuccess: (data, old) => ({
    type: Types.GET_CONTACT_LIST_SUCCESS,
    payload: {data},
    listOld: old
  }),

  getContactListFailure: errorMessage => ({
    type: Types.GET_CONTACT_LIST_FAILURE,
    payload: {errorMessage},
  }),

  clearContact: () => ({
    type: Types.CLEAR_CONTACT_LIST,
  }),

  // create new contact
  postContactRequest: (param, callback) => ({
    type: Types.POST_CONTACT_REQUEST,
    payload: {param},
    callback: callback
  }),

  postContactSuccess: (data) => ({
    type: Types.POST_CONTACT_SUCCESS,
    payload: {data}
  }),

  postContactFailure: errorMessage => ({
    type: Types.POST_CONTACT_FAILURE,
    payload: {errorMessage},
  }),

  // delete contact
  deleteContactRequest: (param, callback) => ({
    type: Types.DELETE_CONTACT_REQUEST,
    payload: {param},
    callback: callback
  }),

  deleteContactSuccess: (data) => ({
    type: Types.DELETE_CONTACT_SUCCESS,
    payload: {data}
  }),

  deleteContactFailure: errorMessage => ({
    type: Types.DELETE_CONTACT_FAILURE,
    payload: {errorMessage},
  }),
};

const contact = (
  state = initialState,
  {type, payload, listOld},
) => {
  switch (type) {
    case Types.GET_CONTACT_LIST_REQUEST:
      console.log('> GET_CONTACT_LIST_REQUEST');
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: null,
      };

    case Types.GET_CONTACT_LIST_SUCCESS:
      console.log('> GET_CONTACT_LIST_SUCCESS');
      console.log(payload.data);
      return {
        ...state,
        contactList: [...listOld, ...payload.data],
        loading: false,
        error: false,
        errorMessage: null,
      };
    case Types.GET_CONTACT_LIST_FAILURE:
      console.log('> GET_CONTACT_LIST_FAILURE');
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.errorMessage,
      };
    case Types.CLEAR_CONTACT_LIST:
      console.log('> CLEAR_CONTACT_LIST');
      return {
        ...state,
        error: false,
        contactList: [],
        errorMessage: null,
      };
    
    //add contact
    case Types.POST_CONTACT_REQUEST:
      console.log('> POST_CONTACT_REQUEST');
      return {
        ...state,
        loading: true,
        errorMessage: null,
        error: false,
      };

    case Types.POST_CONTACT_SUCCESS:
      console.log('> POST_CONTACT_SUCCESS');
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
      };

    case Types.POST_CONTACT_FAILURE:
      console.log('> POST_CONTACT_FAILURE');
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.errorMessage,
      };

    //delete contact
    case Types.DELETE_CONTACT_REQUEST:
      console.log('> DELETE_MY_ARTICLE_REQUEST');
      return {
        ...state,
        loading: true,
        errorMessage: null,
        error: false,
      };

    case Types.DELETE_CONTACT_SUCCESS:
      console.log('> DELETE_MY_ARTICLE_SUCCESS');
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
      };

    case Types.DELETE_CONTACT_FAILURE:
        console.log('> DELETE_MY_ARTICLE_FAILURE');
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: payload.errorMessage,
        };
    default:
      return state;
  }
};

export default contact;
