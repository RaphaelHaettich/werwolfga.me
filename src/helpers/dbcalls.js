import { base } from '../config/constants'


export var post = (resolve, reject, inviteCode, userId, collection) => {
    base.push(collection, {
        data: {code: inviteCode, host: userId, state: 'draft'}
    }).then(snapshot => {
        resolve(snapshot.key)
    }).catch(err => {
        //handle error
        alert("post failed "+ err)
    });
}




