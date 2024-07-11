import {atom} from 'recoil';

const userAtom = atom({
    key: 'userAtom',
    default: JSON.parse(localStorage.getItem('restaurant-user-details')),   
});

export default userAtom;