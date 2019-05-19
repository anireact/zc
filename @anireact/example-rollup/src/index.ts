import { f } from '@anireact/example-dependency';

import { i } from './i';

export const g = async (a: number) => (await Promise.resolve(f(a, 1))) + 1;
export const h = (a: readonly number[]) => a;
export const j = i(0); // tslint:disable-line no-unsafe-any

export * from './k';

export * from 'upath';
