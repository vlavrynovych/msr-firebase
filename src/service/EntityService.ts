import {AbstractFirebaseService} from "./AbstractFirebaseService";
import {database} from "firebase-admin";
import {IEntity} from "../interface";

export class EntityService<T extends IEntity> extends AbstractFirebaseService {
    constructor(protected db: database.Database,
                protected root:string) {
        super(db);
    }

    public getAll():Promise<T[]> {
        return this.getList(this.root);
    }

    getAllAsObject() {
        return this.getObject(this.root);
    }

    get(key:string) {
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

    async updateAll(modifier:ModifierFunction<T>) {
        return this.getAll().then(async entities => {

            const results:ModificationResults = {
                skipped: [],
                updated: []
            };

            const tryUpdate = async (entity: T) => {
                if(!entity.key) return
                const modifiedEntity:T = modifier(entity);

                if (!modifiedEntity) {
                    results.skipped.push(entity.key)
                    return;
                }

                await this.save(modifiedEntity);
                results.updated.push(entity.key)
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

    async removeAll(ids:string[]) {
        const task = ids.map(id => this.remove(id));
        await Promise.all(task)
    }

    findAllBy(propertyName:string,
              value:number | string | boolean | null):Promise<T[]> {
        return super.findAllObjectsBy(this.root, propertyName, value);
    }
}

export type ModifierFunction<T> = {
    (entity:T): T
}

export type ModificationResults = {
    skipped: string[],
    updated: string[]
}