import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    id: string;
};
export interface SwitchFamily extends BaseWebAPI {
}
export declare class SwitchFamily {
    /**
     * Switch Current Family
     * @description Switch to the default family
     *
     * @param options - The base information.
     * @param options.id - Target Family ID.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    switchFamily(options: baseInfo): Promise<any>;
}
