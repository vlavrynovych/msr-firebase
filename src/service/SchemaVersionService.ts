export class SchemaVersionService {

    async createTable(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }

    async isInitialized(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }

    async validateTable(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }

}