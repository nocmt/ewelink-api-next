import { BaseWebAPI } from "../../WebAPI.js";
export declare type groupInfo = {
    id: string;
};
export interface DelGroup extends BaseWebAPI {
}
export declare class DelGroup {
    /**
     * Delete a Group.
     *
     * @param options - The group information.
     * @param options.id - The group id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delGroup(options: groupInfo): Promise<any>;
}
