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
  const newApt = new Apt({
    AptNumber: stats.length + 1,
    rentDue: payload.rent,
    rentPaid: payload.rent,
    tenants: payload.members,

  });
  return newApt.save();
}

async function addTenant(payload) {
  console.log('aptService-addTenant payload:', payload);
  return Apt.findOne({ AptNumber: payload.apt })
    .exec()
    .then(
      (apt) => {
        if (!apt) {
          const newApt = createApt({ members: [payload.user], rent: 1720 });
          return User.updateOne({ _id: payload.userId }, { aptId: payload.apt })
            .exec()
            .then(() => newApt);
        }
        apt.tenants.push(payload.user);
        return apt.save()
          .then(() => User.updateOne({ _id: payload.userId }, { aptId: payload.apt })
            .exec()
            .then(() => apt));
      },
    );
}

module.exports = { getAptTenants, createApt, addTenant };

// {
// 	"rent": 1720,
// 	"members": ["dedny", "mak"]
// }
