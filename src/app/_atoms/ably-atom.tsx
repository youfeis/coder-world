// src/_atoms/ably-atom.tsx
'use client';

import { atom } from 'jotai';
import { Realtime } from 'ably';
import { env } from "~/env";

const ablyAtom = atom(new Realtime(env.NEXT_PUBLIC_ABLY_API_KEY));

export { ablyAtom };