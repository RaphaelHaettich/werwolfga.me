import { base } from '../config/constants';

export var push = (resolve, reject, data, collection) => {
  base
    .push(collection, {
      data
    })
    .then(snapshot => {
      resolve(snapshot);
    })
    .catch(err => {
      //handle error
      console.error(err);
    });
};

export var update = (resolve, reject, data, collection) => {
  base
    .update(collection, {
      data
    })
    .then(snapshot => {
      resolve(snapshot);
    })
    .catch(err => {
      //handle error
      console.error(err);
    });
};

export var post = (resolve, reject, data, collection) => {
  base
    .post(collection, {
      data
    })
    .then(snapshot => {
      resolve(snapshot);
    })
    .catch(err => {
      //handle error
      console.error(err);
    });
};

export var fetch = (resolve, reject, collection, query, asArray) => {
  if (asArray === undefined) {
    asArray = true;
  }
  query = query || {};
  base
    .fetch(collection, {
      context: {},
      asArray,
      queries: query
    })
    .then(snapshot => {
      resolve(snapshot);
    })
    .catch(err => {
      //handle error
      console.error(err);
    });
};

export var remove = (resolve, reject, collection) => {
  base
    .remove(collection)
    .then(() => {
      resolve('done');
    })
    .catch(err => {
      //handle error
      console.error(err);
    });
};
