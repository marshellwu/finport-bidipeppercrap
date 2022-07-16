import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Account } from './types/account';

export const accounts = writable([]);