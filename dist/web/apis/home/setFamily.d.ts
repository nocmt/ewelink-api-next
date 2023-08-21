import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    id?: string;
    newName: string;
};
export interface SetFamily extends BaseWebAPI {
}
export declare class SetFamily {
    /**
     * Change Home Name
     * @description Currently, it only allows you to change the name of a home
     *
     * @param options - The base information.
     * @param options.id - option, The family id. Default is the current family.
     * @param options.newName - The new family name.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setFamily(options: baseInfo): Promise<any>;
}
