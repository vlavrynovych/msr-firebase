import {database} from "firebase-admin";
import _ from 'lodash';

const VALUE = 'value';
const KEY = 'key';

export class FirebaseDataService {

    public constructor(protected db:database.Database) {}

    public async getList(path: string) {
        const snapshot = await this.getSnapshot(path)
        return FirebaseDataService.convertObjectToList(snapshot.val());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updateObject(path:string, obj:any) {
        return this.db.ref(path).update(obj);
    }

    public async getObject(path: string) {
        const snapshot = await this.getSnapshot(path)
        return FirebaseDataService.mixKey(snapshot.val(), snapshot.key)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public setObject(path:string, obj:any) {
        return this.db.ref(path).set(obj);
    }

    public async findAllObjectsBy(path: string,
                           propertyName: string,
                           value: number | string | boolean | null) {
        const snapshot = await this.db.ref(path)
            .orderByChild(propertyName)
            .equalTo(value)
            .once(VALUE);
        return FirebaseDataService.convertObjectToList(snapshot.val());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static convertObjectToList(obj:any) {
        return _.map(obj, (value, key) => this.mixKey(value instanceof Object ? value: {value:value}, key));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static mixKey(obj:any, key:string|null|undefined) {
        if(!obj || !key) return obj;

        Object.defineProperty(obj, KEY, {
            value: key,
            enumerable: false,
            writable: false
        });
        return obj;
    }

    public getSnapshot(path:string) {
        return this.db.ref(path).once(VALUE)
    }
}