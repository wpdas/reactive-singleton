import Observable from './observable';
import { Status } from './types';
export declare const getObservable: (key: string) => Observable<Status>;
export declare const addObservable: (key: string, observable: Observable<Status>) => void;
export declare const getObservablesKeys: () => string[];
