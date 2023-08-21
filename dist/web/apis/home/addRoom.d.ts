import { BaseWebAPI } from "../../WebAPI.js";
export declare type familyInfo = {
    familyId: string;
    name: string;
    sort: number | 1 | 2;
};
export interface AddRoom extends BaseWebAPI {
}
export declare class AddRoom {
    /**
     * Create 1 new room
     *
     * @param options - The family information.
     * @param options.familyId - The family id.
     * @param options.name - The room name.
     * @param options.sort - The room sort. 1: positive sequence, 2: reverse sequence.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addRoom(options: familyInfo): Promise<any>;
}
