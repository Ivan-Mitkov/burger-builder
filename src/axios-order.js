import axios from 'axios';

import {firebase} from './consts';

const instance=axios.create({
    baseURL:firebase
});

export default instance;