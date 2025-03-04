import { PASSWORD, USERNAME } from '../config/env.config';
import { LoginModel } from '../src/models/login.model';

export const standardUser: LoginModel = {
    username: USERNAME,
    password: PASSWORD,
};
