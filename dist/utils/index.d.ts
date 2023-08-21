export declare const applyMixins: (derivedCtor: any, constructors: any[]) => void;
export declare const nonce: (size?: Number) => string;
/**
 * Hmac-Sha256 Sign
 *
 * @param {string} msg - Message to be signed
 * @param {string} appSecret - App secret
 * @param {number=} isFormat - Message Type, true: such as 'a=1&b=2'；false: Original object
 * @return {Object} sign - Signed message
 */
export declare const sign: (msg: string | {
    [key: string]: any;
}, appSecret: string, isFormat?: boolean) => string;
/**
 * Hash-Sha256 Sign
 *
 * @param {string} str - Message to be signed
 * @return {Object} sign - Signed message
 */
export declare const hashSha256: (str: string) => string;
/**
 * Save the token to local storage
 *
 * @param {string} res - Axios response data
 * @param {string} account - Account name
 * @return {Object} None
 */
/**
 * Get the token to local storage
 *
 * @param {string} region - Region
 * @param {string} account - Account name
 * @return {Object} token - Token
 */
