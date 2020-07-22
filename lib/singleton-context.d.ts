/// <reference types="react" />
import { Status } from './types';
export declare type ProviderStatus = Status | 'next_status';
interface SingletonContextProps {
    status: ProviderStatus;
}
export declare const defaultProps: SingletonContextProps;
export declare const SingletonContext: import("react").Context<SingletonContextProps>;
export {};
