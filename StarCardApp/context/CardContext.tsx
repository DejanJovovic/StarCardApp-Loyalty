import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { CardValues } from '@/types/card';
import { fetchCardValues } from '@/service/cardService';
import { loadCardValues as loadFromStorage, saveCardValues as saveToStorage, clearCardValues } from '@/storage/cardStorage';

type State = {
    cards: CardValues[] | null;
    status: 'idle' | 'loading' | 'ready' | 'error';
    error?: string;
};

type Action =
    | { type: 'LOAD_START' }
    | { type: 'LOAD_SUCCESS'; payload: CardValues[] }
    | { type: 'LOAD_ERROR'; payload: string }
    | { type: 'CLEAR' };

const initialState: State = { cards: null, status: 'idle' };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOAD_START':
            return { ...state, status: 'loading', error: undefined };
        case 'LOAD_SUCCESS':
            return { ...state, status: 'ready', cards: action.payload, error: undefined };
        case 'LOAD_ERROR':
            return { ...state, status: 'error', error: action.payload };
        case 'CLEAR':
            return { ...state, cards: null, status: 'idle', error: undefined };
        default:
            return state;
    }
}

type Ctx = State & {
    initFromCache: () => Promise<void>;
    refreshFromApi: (token: string) => Promise<void>;
    clear: () => Promise<void>;
};

const CardContext = createContext<Ctx | undefined>(undefined);

export const CardProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initFromCache = useCallback(async () => {
        dispatch({ type: 'LOAD_START' });
        try {
            const cached = await loadFromStorage();
            if (cached && cached.length > 0) {
                dispatch({ type: 'LOAD_SUCCESS', payload: cached });
            } else {
                dispatch({ type: 'LOAD_ERROR', payload: 'No cached cards.' });
            }
        } catch (e: any) {
            dispatch({ type: 'LOAD_ERROR', payload: e?.message ?? 'Cache load failed' });
        }
    }, []);

    const refreshFromApi = useCallback(async (token: string) => {
        dispatch({ type: 'LOAD_START' });
        try {
            const cards = await fetchCardValues(token);
            await saveToStorage(cards);
            dispatch({ type: 'LOAD_SUCCESS', payload: cards });
        } catch (e: any) {
            dispatch({ type: 'LOAD_ERROR', payload: e?.message ?? 'API load failed' });
        }
    }, []);

    const clear = useCallback(async () => {
        await clearCardValues();
        dispatch({ type: 'CLEAR' });
    }, []);

    const value: Ctx = { ...state, initFromCache, refreshFromApi, clear };
    return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export function useCard() {
    const ctx = useContext(CardContext);
    if (!ctx) throw new Error('useCard must be used within CardProvider');
    return ctx;
}