import { base } from '../config/constants'


export var push = (resolve, reject, data, collection) => {
    base.push(collection, {
        data: data
    }).then(snapshot => {
        resolve(snapshot)
    }).catch(err => {
        //handle error
        alert("post failed "+ err)
    });
}

export var update = (resolve, reject, data, collection) => {
    base.update(collection, {
        data: data
    }).then(snapshot => {
        resolve(snapshot)
    }).catch(err => {
        //handle error
        console.log(err)
    });
}

export var post = (resolve, reject, data, collection) => {
    base.post(collection, {
        data: data
    }).then(snapshot => {
        resolve(snapshot)
    }).catch(err => {
        //handle error
        console.log(err)
    });
}






