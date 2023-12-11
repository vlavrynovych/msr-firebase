import {FirebaseDataService} from "./FirebaseDataService";
import {database} from "firebase-admin";
import {IEntity} from "../interface";

export class EntityService<T extends IEntity> extends FirebaseDataService {
    constructor(public db: database.Database,
                protected root:string) {
        super(db);
    }

    public getAll():Promise<T[]> {
        return this.getList(this.root);
    }

    getAllAsObject() {
        return this.getObject(this.root);
    }

    get(key:string):Promise<T> {
        return this.getObject(`${this.root}/${key}`);
    }

    /**
     * @param {Object} obj entity object
     * @returns {Promise<String>} promise with string key of created/updated entity
     */
    async save(obj:T) {
        return obj.key ? this.update(obj.key, obj) : this.create(obj);
    }

    async create(obj: T) {
        const ref = await this.db.ref(this.root).push(obj);
        return ref.key as string;
    }

    async updateAll(update:UpdateFunction<T>) {
        return this.getAll().then(async entities => {

            const results:ModificationResults = {
                skipped: [],
                updated: []
            };

            const tryUpdate = async (entity: T) => {
                const isModified = update(entity);

                if (!isModified) {
                    results.skipped.push(entity.key as string)
                    return;
                }

                await this.save(entity);
                results.updated.push(entity.key as string)
            }

            const tasks = entities.map(entity => tryUpdate(entity));
            await Promise.all(tasks);
            return results
        })
    }

    async update(key: string, obj: T) {
        await this.updateObject(`${this.root}/${key}`, obj);
        return key;
    }

    async set(key: string, obj: T) {
        await this.setObject(`${this.root}/${key}`, obj);
        return key;
    }

    async remove(key: string) {
        await this.db.ref(`${this.root}/${key}`).remove();
        return key;
    }

    async removeByIds(ids:string[]) {
        const task = ids.map(id => this.remove(id));
        await Promise.all(task)
    }

    async removeAll() {
        await this.setObject(this.root, '')
    }

    findAllBy(propertyName:string,
              value:number | string | boolean | null):Promise<T[]> {
        return super.findAllObjectsBy(this.root, propertyName, value);
    }
}

export type UpdateFunction<T> = (entity:T) => boolean
export type ModificationResults = {
    skipped: string[],
    updated: string[]
}