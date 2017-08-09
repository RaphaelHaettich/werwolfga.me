import { base, } from '../config/constants';

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
