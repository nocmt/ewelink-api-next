import { BaseWebAPI } from "../../WebAPI.js";
export declare type groupInfo = {
    newName: string;
    id: string;
};
export interface SetGroup extends BaseWebAPI {
}
export declare class SetGroup {
    /**
     * Update the name of the group
     *
     * @param options - The group information.
     * @param options.newName - The new name of the group.
     * @param options.id - The group id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setGroup(options: groupInfo): Promise<any>;
}
