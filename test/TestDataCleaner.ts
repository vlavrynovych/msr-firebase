import {TestConfig} from "./TestConfig";
import {EntityService, IEntity} from "../src";
import {database} from "firebase-admin";

export class TestDataCleaner {

    private readonly cfg:TestConfig

    constructor(private db:database.Database) {
        this.cfg = new TestConfig()
    }

    private service: EntityService<IEntity>|undefined

    public async clean() {
        const service = await this.getService();
        await service.remove(this.cfg.getRoot())
        process.exit(0)
    }

    public async cleanAll() {
        const service = await this.getService();
        const all = await service.getAll()
        const ids = all.map(r => r.key as string)
        await service.removeAll(ids)
        process.exit(0)
    }

    private async getService() {
        if(!this.service) this.service = new EntityService<IEntity>(this.db, "/")
        return this.service
    }
}