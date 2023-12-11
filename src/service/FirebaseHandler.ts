import {IDatabaseMigrationHandler} from "migration-script-runner";
import {database} from "firebase-admin";
import {version} from '../../package.json'

import {
    AppConfig,
    BackupService,
    SchemaVersionService,
    MigrationScriptService,
    DBConnector
} from "../index";

export class FirebaseHandler implements IDatabaseMigrationHandler {

    backup:BackupService
    schemaVersion:SchemaVersionService

    private constructor(public cfg:AppConfig,
                        public db:database.Database) {
        this.backup = new BackupService(db)
        const mss = new MigrationScriptService(db, this.cfg.buildPath(this.cfg.tableName))
        this.schemaVersion = new SchemaVersionService(mss, cfg)
    }

    public static async getInstance(cfg:AppConfig):Promise<FirebaseHandler> {
        const db = await DBConnector.connect(cfg)
        return new FirebaseHandler(cfg, db)
    }

    getName = () => `Firebase v${version}`
}