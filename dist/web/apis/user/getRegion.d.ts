import { BaseWebAPI } from "../../WebAPI.js";
export declare type regionInfo = {
    areaCode: string;
};
export interface GetRegion extends BaseWebAPI {
}
export declare class GetRegion {
    /**
     * Obtain the region corresponding to the country/region code
     * @description Query the server area corresponding to the telephone area code
     *
     * @param options - The region information.
     * @param options.areaCode - The area code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getRegion(options: {
        areaCode: string;
    }): Promise<any>;
}
