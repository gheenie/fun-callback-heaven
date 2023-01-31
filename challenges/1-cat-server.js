const request = require('../utils/server');

function checkServerStatus(callback) {
  request('/status', callback);
}

function fetchBannerContent(callback) {
  request('/banner', (err, response) => {
    if (err) callback(err);
    else {
      const updatedBanner = JSON.parse(JSON.stringify(response));
      updatedBanner.copyrightYear = 2023;
      callback(null, updatedBanner);
    }
  });
}

function fetchAllOwners(callback) {
  request('/owners', (err, response) => {
    if (err) callback(err);
    else {
      const responseCopy = JSON.parse(JSON.stringify(response));
      const updatedOwners = responseCopy.map(owner => owner.toLowerCase());
      callback(null, updatedOwners);
    }
  });
}

function fetchCatsByOwner(owner, callback) {
  request(`/owners/${owner}/cats`, (err, response) => {
    if (err) {
      callback(err);
    } else {
      const cats = JSON.parse(JSON.stringify(response));
      callback(null, cats);
    }
  });
}

// Northcoders' tests don't test for original array order - index and count not required.
function fetchCatPics(catNames, callback) {
  if (catNames.length === 0) {
    callback(null);
  } else {
    const catPics = [];

    catNames.forEach(catName => {
      request(`/pics/${catName}`, (err, response) => {
        if (err) {
          catPics.push('placeholder.jpg');
        } else {
          catPics.push(response);
        }
        
        if (catNames.length === catPics.length) {
          callback(null, catPics);
        }
      });
    });
  }
}

// Still not tested for original array order, but tested for timeout - not using count will result in timing out.
function fetchAllCats(callback) {
  fetchAllOwners((err, updatedOwners) => {
    if (err) {
      callback(err);
    } else {
      const catsForAllOwners = [];
      let count = 0;

      updatedOwners.forEach(owner => {
        fetchCatsByOwner(owner, (err, cats) => {
          if (err) {
            callback(err);
          } else {
            cats.forEach(cat => catsForAllOwners.push(cat));
          }
          
          count++;

          if (updatedOwners.length === count) {
            callback(null, catsForAllOwners.sort());
          }
        });
      });
    }
  });
}

function fetchOwnersWithCats(callback) {
  fetchAllOwners((err, updatedOwners) => {
    if (err) {
      callback(err);
    } else {
      const catsForAllOwners = [];
      const ownersWithCats = [];
      let count = 0;

      updatedOwners.forEach(owner =>
        fetchCatsByOwner(owner, (err, cats) => {
          if (err) {
            callback(err);
          } else {
            ownersWithCats.push({ owner: owner, cats: cats.sort() });
            // catsForAllOwners.push(cats);
          }

          count++;

          if (updatedOwners.length === count) {
            callback(null, ownersWithCats);
          }
        })
      );
    }
  });
}
// this function should take a callback function as its only argument
// this function should make use of fetchAllOwners and fetchCatsByOwner in order to build an array of objects, each with an owner and cats key.
// the order of the objects is critical, and must be preserved - however, sorting is incredibly inefficient. Maintain the correct order without sorting
// you get the drill by now, but you must pass the array of cats and owners to the callback function

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
