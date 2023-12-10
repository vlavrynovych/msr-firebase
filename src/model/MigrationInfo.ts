import {IEntity} from "../interface";
import {MigrationScript} from "migration-script-runner";

export class MigrationInfo extends MigrationScript implements IEntity{
    key: string | undefined;
    finishedAt: number;
    name: string;
    result: string;
    startedAt: number;
    timestamp: number;
    username: string;

    constructor(key: string | undefined, name: string, filepath: string, timestamp: number,
                username: string, startedAt: number, finishedAt: number, result: string) {
        super(name, filepath, timestamp);
        this.name = name;
        this.key = key;
        this.username = username;
        this.timestamp = timestamp;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.result = result;
    }
}