import { SingletonManager } from './singleton-manager';
export declare const addSingleton: (key: string, singletonManager: SingletonManager) => void;
export declare const getSingleton: (key: string) => SingletonManager;
