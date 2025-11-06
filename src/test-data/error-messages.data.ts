import { ErrorMessagesModel } from '@_src/models/error-messages.model';

export const errorMessages: ErrorMessagesModel = {
    invalidCredentials:
        'Epic sadface: Username and password do not match any user in this service',
    emptyUsername: 'Epic sadface: Username is required',
    emptyPassword: 'Epic sadface: Password is required',
    lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
};
