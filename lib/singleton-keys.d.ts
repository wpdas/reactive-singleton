import { SingletonManager } from './singleton-manager';
export declare const addSingletonManager: (key: string, singletonManager: SingletonManager) => void;
export declare const getSingletonManager: (key: string) => SingletonManager;
export declare const getSingletonManagersKeys: () => string[];
