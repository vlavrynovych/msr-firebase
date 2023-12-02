import {IDB, IDatabaseMigrationHandler, IMigrationInfo, MigrationScript} from "migration-script-runner";
import {AppConfig} from "../model";
import {BackupService} from "./BackupService";
import {version} from '../../package.json'
import {DBConnector} from "./DBConnector";
import {database} from "firebase-admin";

export class FirebaseHandler implements IDatabaseMigrationHandler {

    backupService:BackupService

    private constructor(public cfg:AppConfig, private dbInstance:database.Database) {
        this.db = new class implements IDB {
            test() {
                throw new Error("Method not implemented.");
            }
        }

        this.backupService = new BackupService(dbInstance);
    }

    public static async init(cfg:AppConfig):Promise<FirebaseHandler> {
        let db = await DBConnector.connect(cfg);
        return new FirebaseHandler(cfg, db);
    }

    db: IDB;

    getName(): string {
        return `Firebase v${version}`
    }
    async isInitialized(tableName: string): Promise<boolean> {
        return true
    }
    async createTable(tableName: string): Promise<boolean> {
        return true
    }
    async validateTable(tableName: string): Promise<boolean> {
        return true
    }
    async getAll(): Promise<MigrationScript[]> {
        return []
    }
    async register(details: IMigrationInfo): Promise<void> {

    }

    async backup(): Promise<string> {
        return await this.backupService.backup()
    }

    async restore(data: string): Promise<string> {
        return await this.backupService.restore(data)
    }
}