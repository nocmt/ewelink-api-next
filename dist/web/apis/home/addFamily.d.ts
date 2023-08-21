import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    name: string;
    sort: number | 1 | 2;
    roomNameList?: string[];
};
export interface AddFamily extends BaseWebAPI {
}
export declare class AddFamily {
    /**
     * Create 1 new family
     *
     * @param options - The base information.
     * @param options.name - The family name.
     * @param options.sort - The family sort. 1: positive sequence, 2: reverse sequence.
     * @param options.roomNameList - The room name list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addFamily(options: baseInfo): Promise<any>;
}
