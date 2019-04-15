import { f } from '@anireact/example-dependency';

export const g = (a: number) => f(a, 1);

export const h = (a: readonly number[]) => a;
