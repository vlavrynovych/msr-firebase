import {Config} from "migration-script-runner";

export class AppConfig extends Config {
    public applicationCredentials:string|undefined = process.env.GOOGLE_APPLICATION_CREDENTIALS
    public databaseUrl:string|undefined = process.env.DATABASE_URL
}