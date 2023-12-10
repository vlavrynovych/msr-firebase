import * as admin from "firebase-admin";
import {database} from "firebase-admin";
import {AppConfig} from "../model";

export class DBConnector {

    public static async connect(cfg:AppConfig): Promise<database.Database> {
        console.log(`Init DB connection: databaseUrl = ${cfg.databaseUrl}; applicationCredentials = ${cfg.applicationCredentials}`)

        const filePath = cfg.applicationCredentials
        if(!filePath) throw new Error("Application credentials not found")

        const serviceAccount = await import(filePath);
        const random = Math.floor(Math.random() * 6) + 1
        const app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        }, `${Date.now()}${random}`);

        return app.database(cfg.databaseUrl)
    }
}