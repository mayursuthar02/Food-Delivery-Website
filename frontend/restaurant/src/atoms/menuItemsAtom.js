import {atom} from 'recoil';

const menuItemsAtom = atom({
    key: 'menuItemsAtom',
    default: [],   
});

export default menuItemsAtom;