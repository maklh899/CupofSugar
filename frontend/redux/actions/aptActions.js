import { aptConstants } from '../constants';

const { SERVER_ADDR, authFetch } = require('../../server');

const makePaymentRequest = () => ({
  type: aptConstants.MAKE_PAYMENT_REQUEST,
});
const makePaymentSuccess = (response) => ({
  type: aptConstants.MAKE_PAYMENT_SUCCESS,
  payload: response,
});
const makePaymentFailure = (error) => ({
  type: aptConstants.MAKE_PAYMENT_FAILURE,
  payload: error,
});

export const makePayment = (payload) => function makepayment(dispatch) {
  dispatch(makePaymentRequest);
  console.log('makePayment action payload: ', payload);
  const body = JSON.stringify({ amount: payload.amount });
  authFetch('/apt/makePayment', 'POST', body)
    .then((response) => {
      if (response.success) {
        console.log('makePayment action success: ', response);
        dispatch(makePaymentSuccess(response.response));
      } else {
        console.log('makePayment action failure: ', response);
        dispatch(makePaymentFailure(response.mess));
      }
    });
};

const getPaymentHistRequest = () => ({
  type: aptConstants.PAYMENT_HIST_REQUEST,
});
const getPaymentHistSuccess = (history) => ({
  type: aptConstants.PAYMENT_HIST_SUCCESS,
  payload: history,
});
const getPaymentHistFailure = (error) => ({
  type: aptConstants.PAYMENT_HIST_FAILURE,
  payload: error,
});

export const getPaymentHist = () => function getpaymenthist(dispatch) {
  dispatch(getPaymentHistRequest);
  authFetch('/apt/getAptLedger')
    .then((response) => {
      if (response.success) {
        console.log('getPaymentHist action history: ', response.history);
        dispatch(getPaymentHistSuccess(response.history));
      } else {
        console.log('getPaymentHist action failure: ', response);
        dispatch(getPaymentHistFailure(response.mess));
      }
    });
};

const getBalanceInfoRequest = () => ({
  type: aptConstants.GET_BALANCE_INFO_REQUEST,
});
const getBalanceInfoSuccess = (balance) => ({
  type: aptConstants.GET_BALANCE_INFO_SUCCESS,
  payload: { balanceDue: balance.balanceDue, balancePaid: balance.balancePaid },
});
const getBalanceInfoFailure = (error) => ({
  type: aptConstants.GET_BALANCE_INFO_FAILURE,
  payload: error,
});

export const getBalanceInfo = () => function getbalanceinfo(dispatch) {
  dispatch(getBalanceInfoRequest);
  authFetch('/apt/getAptBalance')
    .then((response) => {
      if (response.success) {
        console.log('getBalanceInfo action balance: ', response.balance);
        dispatch(getBalanceInfoSuccess(response.balance));
      } else {
        console.log('getBalanceInfo action failure: ', response);
        dispatch(getBalanceInfoFailure(response.mess));
      }
    });
};

const makeMaintReqRequest = () => ({
  type: aptConstants.MAKE_MAINTENCE_REQ_REQUEST,
});
const makeMaintReqSuccess = () => ({
  type: aptConstants.MAKE_MAINTENCE_REQ_SUCCESS,
});
const makeMaintReqFailure = (error) => ({
  type: aptConstants.MAKE_MAINTENCE_REQ_FAILURE,
  payload: error,
});

export const makeMaintReq = (payload) => function makemaintreq(dispatch) {
  dispatch(makeMaintReqRequest);
  console.log('makeMaintReq action payload: ', payload);
  const body = JSON.stringify({ requestor: payload.requestor, request: payload.request });
  authFetch('/apt/makeMaintReq', 'POST', body)
    .then((response) => {
      if (response.success) {
        dispatch(makeMaintReqSuccess(response));
      } else {
        console.log('makeMaintReq action failure: ', response);
        dispatch(makeMaintReqFailure(response.mess));
      }
    });
};

const getMaintReqsRequest = () => ({
  type: aptConstants.ALL_MAINTENCE_REQ_REQUEST,
});
const getMaintReqsSuccess = (requests) => ({
  type: aptConstants.ALL_MAINTENCE_REQ_SUCCESS,
  payload: requests,
});
const getMaintReqsFailure = (error) => ({
  type: aptConstants.ALL_MAINTENCE_REQ_FAILURE,
  payload: error,
});

export const getMaintReqs = () => function getmaintreqs(dispatch) {
  dispatch(getMaintReqsRequest);
  authFetch('/apt/getMaintReqs')
    .then((response) => {
      if (response.success) {
        dispatch(getMaintReqsSuccess(response.requests));
      } else {
        console.log('getMaintReqs action failure: ', response);
        dispatch(getMaintReqsFailure(response.mess));
      }
    });
};