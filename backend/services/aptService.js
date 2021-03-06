const Apt = require('../models/aptModel');
const User = require('../models/userModel');

// get apartment tenants by username
async function getAptTenants(payload) {
  console.log('aptService-getAptTenants payload:', payload);
  // console.log('Service- getAptTenants:', Apt);

  return Apt.findOne({ AptNumber: payload })
    .exec()
    .then((apt) => {
      if (!apt) {
        throw new Error(`Apartment ${payload} does not exist`);
      } else {
        return apt.tenants;
      }
    });
}

// create new Apartment
async function createApt(payload) {
  console.log('createApt() payload:', payload);
  const stats = await Apt.find();
  console.log('Apt stats: ', stats.length);

  const today = new Date();
  const paymentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const newApt = new Apt({
    AptNumber: stats.length + 1,
    balanceDue: payload.rent,
    rent: payload.rent,
    paymentMonth,
    balancePaid: 0,
    tenants: payload.members,

  });
  newApt.save();
  return newApt;
}

async function addTenant(payload) {
  console.log('aptService-addTenant payload:', payload);
  if (Number.isNaN(parseInt(payload.aot, 10))) {
    throw new Error('Apartment # is not a number.');
  }
  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then(
      (apt) => {
        if (!apt) {
          return createApt({ members: [payload.user], rent: 1720 })
            .then((newApt) => {
              console.log('aptService-addTenant newApt:', newApt);
              return User.updateOne(
                { _id: payload.userId }, { aptId: parseInt(newApt.AptNumber, 10) },
              )
                .exec()
                .then(() => newApt);
            })
            .catch(() => console.log('aptService-addTenant error'));
        }
        apt.tenants.push(payload.user);
        return apt.save()
          .then(() => User.updateOne({ _id: payload.userId }, { aptId: payload.apt })
            .exec()
            .then(() => apt));
      },
    );
}

async function addPayment(payload) {
  console.log('aptService-addPayment payload:', payload);
  if (Number.isNaN(parseInt(payload.amount, 10))) {
    throw new Error('Input is not a number.');
  }
  if (parseInt(payload.amount, 10) <= 0) {
    throw new Error('Input must be greater than 0.');
  }
  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then(
      (apt) => {
        let amountPaid = parseInt(apt.balancePaid, 10);
        amountPaid += parseInt(payload.amount, 10);

        let amountDue = parseInt(apt.balanceDue, 10);

        let response = '';

        const paymentMonth = new Date(apt.paymentMonth);
        let newMonth = paymentMonth;

        if (amountDue < parseInt(payload.amount, 10)) {
          const beforeDue = amountDue;
          amountDue = parseInt(apt.rent, 10);
          amountDue -= (parseInt(payload.amount, 10) - beforeDue);

          // increments to next Month
          newMonth = new Date(paymentMonth.setMonth(paymentMonth.getMonth() + 1));

          response = `This Month's balance is paid off, there's ${amountDue} left for next month`;
        } else {
          amountDue -= parseInt(payload.amount, 10);
          response = `There's $${amountDue} due for this month`;
        }

        apt.paymentHistory.push({ payer: payload.payer, payment: payload.amount });
        return Apt.updateOne({ _id: apt['_id'] }, {
          balanceDue: amountDue,
          balancePaid: amountPaid,
          paymentMonth: newMonth,
          paymentHistory: apt.paymentHistory,
        })
          .exec()
          .then(() => response);
      },
    );
}

// get apartment payment history by username
async function paymentHistory(payload) {
  console.log('aptService-paymentHistory payload:', payload);

  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then((apt) => {
      if (!apt) {
        throw new Error(`Apartment ${payload} does not exist`);
      } else {
        return apt.paymentHistory;
      }
    });
}

async function aptBalance(payload) {
  console.log('aptService-aptBalance payload:', payload);

  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then((apt) => {
      if (!apt) {
        throw new Error(`Apartment ${payload} does not exist`);
      } else {
        return {
          balanceDue: apt.balanceDue,
          balancePaid: apt.balancePaid,
          paymentMonth: apt.paymentMonth,
        };
      }
    });
}

// make a Maintence request
// payload: apt, requestor, body
async function addMaintReq(payload) {
  console.log('aptService-addMaintReq payload:', payload);
  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then(
      (apt) => {
        apt.mainRequest.push({
          requestor: payload.requestor,
          body: payload.body,
          status: payload.status,
        });
        return Apt.updateOne({ _id: apt['_id'] }, { mainRequest: apt.mainRequest })
          .exec()
          .then(() => apt.mainRequest);
      },
    );
}

// get apartment maintence rewquests by username
async function maintReqs(payload) {
  console.log('aptService-maintReqs payload:', payload);

  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then((apt) => {
      if (!apt) {
        throw new Error(`Apartment ${payload} does not exist`);
      } else {
        return apt.mainRequest;
      }
    });
}

module.exports = {
  getAptTenants,
  createApt,
  addTenant,
  addPayment,
  paymentHistory,
  aptBalance,
  addMaintReq,
  maintReqs,
};
