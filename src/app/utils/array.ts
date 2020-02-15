import { getRandomInt } from './number';

export function inArray(arr: Array<any>, target: any): boolean{
    return arr.indexOf(target) !== -1;
}

export function shuffle<T>(arr: Array<T>): Array<T>{
    const result = arr.slice();
    for(let i=0;i<result.length; i++){
        // 0 和i 之间的一个随机数
        const j = getRandomInt([0,1]);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}