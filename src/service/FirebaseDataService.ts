import {database} from "firebase-admin";
import _ from 'lodash';
import DataSnapshot = database.DataSnapshot;

const VALUE = 'value';
const KEY = 'key';

export class FirebaseDataService {

    protected constructor(protected db:database.Database) {}

    async getList(path: string) {
        const snapshot = await this.db.ref(path).once(VALUE);
        return FirebaseDataService.handleList(snapshot);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateObject(path:string, obj:any) {
        return this.db.ref(path).update(obj);
    }

    async getObject(path: string) {
        const snapshot = await this.db.ref(path).once(VALUE);
        return FirebaseDataService.mixKey(snapshot.val(), snapshot.key)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setObject(path:string, obj:any) {
        return this.db.ref(path).set(obj);
    }

    async findAllObjectsBy(path: string,
                           propertyName: string,
                           value: number | string | boolean | null) {
        const snapshot = await this.db.ref(path)
            .orderByChild(propertyName)
            .equalTo(value)
            .once(VALUE);
        return FirebaseDataService.handleList(snapshot);
    }

    static handleList(snapshot:DataSnapshot) {
        return FirebaseDataService.convertObjectToList(snapshot.val());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static convertObjectToList(obj:any) {
        return _.map(obj, (value, key) => this.mixKey(value instanceof Object ? value: {value:value}, key));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static mixKey(obj:any|undefined, key:string|null|undefined) {
        if(!obj || !key) return obj;

        Object.defineProperty(obj, KEY, {
            value: key,
            enumerable: false,
            writable: true
        });
        return obj;
    }
}