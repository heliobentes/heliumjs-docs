/* eslint-disable */
/**
* Auto generated file - DO NOT EDIT!
* # Helium Server Type Definitions    
**/
import type { getTasks as method_0_type } from '../server/tasks';

declare module 'helium/server' {
export const getTasks: import('helium/client').MethodStub<
    Parameters<typeof method_0_type['handler']>[0],
    Awaited<ReturnType<typeof method_0_type['handler']>>
>;
}
