import {Config, IDB, IDatabaseMigrationHandler, IMigrationInfo, MigrationScript} from "migration-script-runner";

export class FirebaseHandler implements IDatabaseMigrationHandler {

    constructor(public cfg: Config, public db: IDB) {}

    getName(): string {
        throw new Error("Method not implemented.");
    }
    isInitialized(tableName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createTable(tableName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    validateTable(tableName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<MigrationScript[]> {
        throw new Error("Method not implemented.");
    }
    register(details: IMigrationInfo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    backup(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    restore(data: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}