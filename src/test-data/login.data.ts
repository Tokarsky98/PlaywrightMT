import { PASSWORD, USERNAME } from '@_config/env.config';
import { LoginModel } from '@_src/models/login.model';

export const standardUser: LoginModel = {
    username: USERNAME,
    password: PASSWORD,
};
