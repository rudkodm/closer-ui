import {Unique} from "../model";
import * as _ from 'lodash'

export class Utils {

    public static removeObject<T extends Unique>(arr: T[], o: T) {
        let index = this.findPosition(arr, o);
        arr.splice(index, 1)
    }


    public static replaceWith<T extends Unique>(arr: T[], o: T) {
        let index = this.findPosition(arr, o);
        arr.splice(index, 1, o);
    }

    public static findPosition<T extends Unique>( arr: T[], o: T): number {
        return arr.findIndex(it => it.id === o.id);
    }

    public static clone<T>(o: T): T {
        return _.cloneDeep(o);
    }


}