import {Config} from "migration-script-runner";

export class AppConfig extends Config {
    applicationCredentials:string|undefined = process.env.GOOGLE_APPLICATION_CREDENTIALS
    databaseUrl:string|undefined = process.env.DATABASE_URL

    shift:string|undefined

    public getRoot() {
        return this.buildPath("")
    }

    public buildPath(path:string) {
        return `${this.shift}/${path}`
    }
}