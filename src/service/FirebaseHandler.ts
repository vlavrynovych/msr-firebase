import {IDatabaseMigrationHandler, MigrationScript} from "migration-script-runner";
import {database} from "firebase-admin";
import {version} from '../../package.json'

import {
    AppConfig,
    MigrationInfo,
    BackupService,
    SchemaVersionService,
    MigrationScriptService,
    DBConnector
} from "../index";

export class FirebaseHandler implements IDatabaseMigrationHandler {

    backupService:BackupService
    migrationScriptService: MigrationScriptService;
    schemaVersionService: SchemaVersionService;

    private constructor(public cfg:AppConfig, public db:database.Database) {
        this.backupService = new BackupService(db);
        this.migrationScriptService = new MigrationScriptService(db, this.cfg.buildPath(this.cfg.tableName))
        this.schemaVersionService = new SchemaVersionService()
    }

    public static async getInstance(cfg:AppConfig):Promise<FirebaseHandler> {
        const db = await DBConnector.connect(cfg);
        return new FirebaseHandler(cfg, db);
    }

    getName(): string {
        return `Firebase v${version}`
    }

    async isInitialized(tableName: string): Promise<boolean> {
        return this.schemaVersionService.isInitialized(tableName)
    }

    async createTable(tableName: string): Promise<boolean> {
        return this.schemaVersionService.createTable(tableName)
    }

    async validateTable(tableName: string): Promise<boolean> {
        return this.schemaVersionService.validateTable(tableName)
    }

    async getAll(): Promise<MigrationScript[]> {
        return this.migrationScriptService.getAll()
    }
    async register(details: MigrationInfo): Promise<void> {
        await this.migrationScriptService.save(details);
    }

    async backup(): Promise<string> {
        return this.backupService.backup();
    }

    async restore(data: string): Promise<string> {
        return await this.backupService.restore(data)
    }
}