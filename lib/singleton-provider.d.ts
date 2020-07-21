import React from 'react';
import { Status } from './types';
declare type ProviderStatus = Status | 'next_status';
interface SingletonContextProps {
    status: ProviderStatus;
}
export declare const SingletonContext: React.Context<SingletonContextProps>;
interface SingletonProviderProps {
    readonly children: React.ReactNode;
}
export declare const SingletonProvider: ({ children }: SingletonProviderProps) => JSX.Element;
export {};
