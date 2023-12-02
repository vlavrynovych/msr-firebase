import {IBackup} from "migration-script-runner";
import {database} from "firebase-admin";

export class BackupService implements IBackup {

    static NODES = {
        ALL: ['/'],
        SELECTED: [
            // FILTERED NODES HERE
        ]
    }

    merge:boolean = false

    constructor(private db:database.Database,
                private nodes = BackupService.NODES.ALL) {
    }

    async getData() {
        const data = await Promise.all(this.nodes.map(node => this.db.ref(node).once('value')));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj = {} as any;
        return this.nodes.reduce((acc, name, index) => {
            acc[name] = data[index].val();
            console.log(acc[name]);
            return acc;
        }, obj);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async saveData(data:any) {
        const tasks = Object.keys(data).map((node:string) => {
            const ref = this.db.ref(node);
            // let method = this.merge ? ref.update : ref.set;
            const value = data[node];
            ref.set(value)
        });
        await Promise.all(tasks);
    }

    async backup(): Promise<string> {
        const data = await this.getData()
        return JSON.stringify(data, null, '  ');
    }

    async restore(data: string): Promise<string> {
        await this.saveData(JSON.parse(data))
        return "ok"
    }

}