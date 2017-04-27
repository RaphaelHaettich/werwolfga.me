import { base } from '../config/constants'


export var post = (resolve, reject, data, collection) => {
    base.push(collection, {
        data: data
    }).then(snapshot => {
        resolve(snapshot.key)
    }).catch(err => {
        //handle error
        alert("post failed "+ err)
    });
}






