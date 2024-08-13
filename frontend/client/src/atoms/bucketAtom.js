import {atom} from 'recoil';

const bucketAtom = atom({
    key: 'bucketAtom',
    default: [],
});

export default bucketAtom;