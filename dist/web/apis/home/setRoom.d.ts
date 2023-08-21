import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    id: string;
    newName: string;
};
export interface SetRoom extends BaseWebAPI {
}
export declare class SetRoom {
    /**
     * Change Room Name
     * @description Currently, it only allows you to change the name of a room
     *
     * @param options - The base information.
     * @param options.id - The room id.
     * @param options.newName - The new room name.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setRoom(options: baseInfo): Promise<any>;
}
