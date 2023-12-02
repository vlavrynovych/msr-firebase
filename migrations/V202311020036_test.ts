import {IDatabaseMigrationHandler, IDB, IMigrationInfo, IRunnableScript} from "migration-script-runner";

export class Script implements IRunnableScript {
    up(db: IDB, info: IMigrationInfo, handler: IDatabaseMigrationHandler): Promise<string> {
        return Promise.resolve("");
    }
}