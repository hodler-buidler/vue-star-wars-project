import {v4 as uuid} from 'uuid';

const randIdMixin = {
    methods: {
        randId() {
            return uuid();
        }
    }
};

export default randIdMixin;