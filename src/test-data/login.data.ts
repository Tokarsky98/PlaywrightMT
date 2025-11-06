import { PASSWORD, USERNAME } from '@_config/env.config';
import { LoginModel } from '@_src/models/login.model';

export const standardUser: LoginModel = {
    username: USERNAME,
    password: PASSWORD,
};

export const lockedUser: LoginModel = {
    username: 'locked_out_user',
    password: PASSWORD,
};

export const invalidUsers = {
    wrongPassword: {
        username: USERNAME,
        password: 'wrongPassword',
    },
    emptyUsername: {
        username: '',
        password: PASSWORD,
    },
    emptyPassword: {
        username: USERNAME,
        password: '',
    },
    emptyBoth: {
        username: '',
        password: '',
    },
};
