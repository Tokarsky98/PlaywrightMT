import * as dotenv from 'dotenv';

dotenv.config({ override: true });

/**
 * Retrieves the value of a specified environment variable.
 * @param envVariable - Name of the env variable.
 * @returns - Throws error if variable is not set, otherwise it returns its value.
 */
function requireEnvVariable(envVariable: string): string {
    const envVariableValue = process.env[envVariable] ?? '[NOT SET]';
    if (envVariableValue === undefined) {
        throw new Error(`Environment variable ${envVariable} is not set.`);
    }

    return envVariableValue;
}

export const USERNAME = requireEnvVariable('USERNAME');
export const PASSWORD = requireEnvVariable('PASSWORD');
