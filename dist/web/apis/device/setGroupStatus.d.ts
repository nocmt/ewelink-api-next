import { BaseWebAPI } from "../../WebAPI.js";
export declare type groupInfo = {
    id: string;
    params: object;
};
export interface SetGroupStatus extends BaseWebAPI {
}
export declare class SetGroupStatus {
    /**
     * Update the status of the group
     *
     * @param options - The group information.
     * @param options.id - The group id.
     * @param options.params - The group params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setGroupStatus(options: groupInfo): Promise<any>;
}
