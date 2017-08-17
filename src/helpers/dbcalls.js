import { base, } from '../config/constants';

// push content to db, adds new db node
export const push = (resolve, reject, data, collection) => {
  base
    .push(collection, {
      data,
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
};

// update db endpoint
export const update = (resolve, reject, data, collection) => {
  base
    .update(collection, {
      data,
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
};

// post data to specific endpoint
export const post = (resolve, reject, data, collection) => {
  base
    .post(collection, {
      data,
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
};

// fetch db endpoint
export const fetch = (resolve, reject, collection, queryParam, asArray) => {
  let array = true;
  if (asArray !== undefined) {
    array = asArray;
  }
  
  const query = queryParam || {};
  base
    .fetch(collection, {
      context: {},
      asArray: array,
      queries: query,
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
};

// remove db endpoint
export const remove = (resolve, reject, collection) => {
  base
    .remove(collection)
    .then(() => {
      resolve('done');
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
};
