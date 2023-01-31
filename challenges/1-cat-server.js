const request = require('../utils/server');

function checkServerStatus(callback) {
  request('/status', callback);
}

function fetchBannerContent(callback) {
  request('/banner', (err, response) => {
    if (err) callback(err);

    const updatedBanner = JSON.parse(JSON.stringify(response));
    updatedBanner.copyrightYear = 2023;
    callback(null, updatedBanner);
  });
}

function fetchAllOwners(callback) {
  request('/owners', (err, response) => {
    if (err) callback(err);

    const responseCopy = JSON.parse(JSON.stringify(response));
    const updatedOwners = responseCopy.map(owner => owner.toLowerCase());
    callback(null, updatedOwners);
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

function fetchCatPics(catNames, callback) {
  if (catNames.length === 0) {
    callback(null);
  }
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

// this function should take an array of strings (names of cat pics) and a callback function
// for each cat name in the passed array, a request should be sent to /pics/:catpic
// each response will represent an actual catpic with the suffix .jpg
// the callback function should be invoked with an array of responses once all the catpics have been collated(the order does not matter)
// the server will respond with an error if the requested pic doesn't contain the word "cat". Therefore, if you receive an error, you must put placeholder.jpg in its place in the response array to act as a placeholder for the missing cat picture.
// Note: You should make the request to receive the string containing .jpg rather than using a JS method!

// Finish;

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
