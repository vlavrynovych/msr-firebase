import {EntityService} from "./EntityService";
import {MigrationInfo} from "../model";
import {IMigrationScript} from "migration-script-runner";

export class MigrationScriptService extends EntityService<MigrationInfo> implements IMigrationScript {}