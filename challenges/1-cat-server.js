const request = require('../utils/server');

function checkServerStatus(callback) {
  request('/status', callback);
}

function fetchBannerContent(callback) {
  request('/banner', (err, response) => {
    if (err) callback(err);
    
    const updatedBanner = JSON.parse( JSON.stringify(response) );
    updatedBanner.copyrightYear = 2023;
    callback(null, updatedBanner);
  });
}

function fetchAllOwners() {}

function fetchCatsByOwner() {}

function fetchCatPics() {}

function fetchAllCats() {}

function fetchOwnersWithCats() {}

function kickLegacyServerUntilItWorks() {}

function buySingleOutfit() {}

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
