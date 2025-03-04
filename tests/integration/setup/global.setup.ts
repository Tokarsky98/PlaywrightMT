import { STORAGE_STATE } from '@_pw-config';
import * as fs from 'fs';

/** Removes the existing STORAGE_STATE file if it exists. */
function globalSetup(): void {
    if (fs.existsSync(STORAGE_STATE)) {
        fs.unlinkSync(STORAGE_STATE);
    }
}

export default globalSetup;
