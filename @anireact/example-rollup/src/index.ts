import { f } from '@anireact/example-dependency';

import { i } from './i';

export const g = (a: number) => f(a, 1);
export const h = (a: readonly number[]) => a;
export const j = i(0); // tslint:disable-line no-unsafe-any
