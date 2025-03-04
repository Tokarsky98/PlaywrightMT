import * as fs from 'fs';
import { STORAGE_STATE } from '../../../playwright.config';

/** Removes the existing STORAGE_STATE file if it exists. */
function globalSetup(): void {
    if (fs.existsSync(STORAGE_STATE)) {
        fs.unlinkSync(STORAGE_STATE);
    }
}

export default globalSetup;
