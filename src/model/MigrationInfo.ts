import {IEntity} from "../interface";
import {MigrationScript} from "migration-script-runner";

export class MigrationInfo extends MigrationScript implements IEntity{
    key: string | undefined;
    finishedAt!: number;
    name!: string;
    result!: string;
    startedAt!: number;
    timestamp!: number;
    username!: string;
}