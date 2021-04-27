const Apt = require('../models/aptModel');

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

module.exports = { getAptTenants, createApt };

// {
// 	"rent": 1720,
// 	"members": ["dedny", "mak"]
// }