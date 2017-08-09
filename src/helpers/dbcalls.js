import { base } from '../config/constants';

export var push = (resolve, reject, data, collection) => {
  base
    .push(collection, {
      data
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      //handle error
      console.error(err);
    });
};

export var update = (resolve, reject, data, collection) => {
  base
    .update(collection, {
      data
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      //handle error
      console.error(err);
    });
};

export var post = (resolve, reject, data, collection) => {
  base
    .post(collection, {
      data
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
      //handle error
      console.error(err);
    });
};

export var fetch = (resolve, reject, collection, queryParam, asArray) => {
  let array = true;
  if(asArray) {
    array = asArray;
  }
  const query = queryParam || {};
  base
    .fetch(collection, {
      context: {},
      array,
      queries: query
    })
    .then((snapshot) => {
      resolve(snapshot);
    })
    .catch((err) => {
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
    .catch((err) => {
      //handle error
      console.error(err);
    });
};
