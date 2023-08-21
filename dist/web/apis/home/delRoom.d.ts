import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    id: string;
};
export interface DelRoom extends BaseWebAPI {
}
export declare class DelRoom {
    /**
     * Delete 1 room
     *
     * @param options - The room information.
     * @param options.id - The room id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delRoom(options: baseInfo): Promise<any>;
}
