import { aptConstants } from '../constants';

const initState = {
  loading: false,
  ledger: [],
  error: '',
  balanceDue: 0,
  balancePaid: 0,
  payResponse: '',
};

const aptReducer = function aptRed(state = initState, action) {
  switch (action.type) {
  case aptConstants.MAKE_PAYMENT_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
      payResponse: '',
    };
  case aptConstants.PAYMENT_HIST_REQUEST:
    return {
      loading: true,
      error: '',
    };
  case aptConstants.MAKE_MAINTENCE_REQ_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  case aptConstants.ALL_MAINTENCE_REQ_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  case aptConstants.GET_BALANCE_INFO_REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };

  case aptConstants.MAKE_PAYMENT_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
      payResponse: '',
    };
  case aptConstants.PAYMENT_HIST_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case aptConstants.MAKE_MAINTENCE_REQ_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case aptConstants.ALL_MAINTENCE_REQ_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case aptConstants.GET_BALANCE_INFO_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };

  case aptConstants.MAKE_PAYMENT_SUCCESS:
    return {
      ...state,
      loading: false,
      payResponse: action.payload,
      error: '',
    };

  case aptConstants.PAYMENT_HIST_SUCCESS:
    return {
      ...state,
      loading: false,
      error: '',
      ledger: action.payload,
    };
  case aptConstants.MAKE_MAINTENCE_REQ_SUCCESS:
    return {
      ...state,
      loading: false,
      error: '',
    };
  case aptConstants.ALL_MAINTENCE_REQ_SUCCESS:
    return {
      ...state,
      loading: false,
      error: '',
      mainReq: action.payload,
    };
  case aptConstants.GET_BALANCE_INFO_SUCCESS:
  {
    return {
      ...state,
      loading: false,
      error: '',
      balanceDue: action.payload.balanceDue,
      balancePaid: action.payload.balancePaid,
    };
  }
  default:
    return { ...state };
  }
};

export default aptReducer;
