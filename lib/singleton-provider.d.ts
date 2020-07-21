import React from 'react';
import { Status } from './types';
interface SingletonContextProps {
    status: Status;
}
export declare const SingletonContext: React.Context<SingletonContextProps>;
interface SingletonProviderProps {
    readonly children: React.ReactNode;
}
export declare const SingletonProvider: ({ children }: SingletonProviderProps) => JSX.Element;
export {};
