import {IMigrationInfo, IRunnableScript} from "migration-script-runner";
import {EntityService, FirebaseHandler, IEntity} from "../../../src";

export class Script implements IRunnableScript {
    async up(db: any, info: IMigrationInfo, handler: FirebaseHandler): Promise<string> {
        class A implements IEntity{
            key: string | undefined;
            customField: string

            constructor(customField: string) {
                this.customField = customField;
            }
        }

        const a = new A('test-case-1')

        const testService = new EntityService(db, handler.cfg.buildPath("test-case-1"))
        const key = await testService.save(a)

        const list = await testService.getAll()
        console.log(list)

        return Promise.resolve(key)
    }
}