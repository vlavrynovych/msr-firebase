import {Config, IDB, IDatabaseMigrationHandler, IMigrationInfo, MigrationScript} from "migration-script-runner";

export class FirebaseHandler implements IDatabaseMigrationHandler {

    constructor() {
        this.cfg = new Config()
        this.db = new class implements IDB {}
    }

    cfg: Config;
    db: IDB;

    getName(): string {
        throw new Error("Method not implemented.");
    }
    isInitialized(tableName: string): Promise<boolean> {
        throw new Error("Method not implemented." + tableName);
    }
    createTable(tableName: string): Promise<boolean> {
        throw new Error("Method not implemented." + tableName);
    }
    validateTable(tableName: string): Promise<boolean> {
        throw new Error("Method not implemented." + tableName);
    }
    getAll(): Promise<MigrationScript[]> {
        throw new Error("Method not implemented.");
    }
    register(details: IMigrationInfo): Promise<void> {
        throw new Error("Method not implemented." + details);
    }
    backup(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    restore(data: string): Promise<string> {
        throw new Error("Method not implemented." + data);
    }

}