import {TestConfig} from "./TestConfig";
import {DBConnector, EntityService, IEntity} from "../src";

type CleanCallback = (testSuiteService: EntityService<IEntity>, cfg: TestConfig) => Promise<void>;

export class TestCleaner {

    public static async clean() {
        await this._clean((testSuiteService: EntityService<IEntity>, cfg: TestConfig) => {
            return this.dropCurrent(testSuiteService, cfg)
        })
    }

    public static async cleanAll() {
        await this._clean((testSuiteService: EntityService<IEntity>) => {
            return this.dropAll(testSuiteService)
        })
    }

    private static async _clean(fn:CleanCallback) {
        const cfg = new TestConfig()
        const db = await DBConnector.connect(cfg)
        const testSuiteService = new EntityService<IEntity>(db, "/")
        await fn(testSuiteService, cfg)
        process.exit(0)
    }

    private static async dropAll(testSuiteService:EntityService<IEntity>) {
        const all = await testSuiteService.getAll()
        const ids = all.map(r => r.key as string)
        await testSuiteService.removeAll(ids)
    }

    private static async dropCurrent(testSuiteService:EntityService<IEntity>, cfg:TestConfig) {
        await testSuiteService.remove(cfg.getRoot())
    }
}