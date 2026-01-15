import { create } from 'zustand';

// 1. Define Types
export type AgentStatus = 'IDLE' | 'THINKING' | 'WARNING' | 'BLOCKED';

export interface AgentState {
    status: AgentStatus;
    message: string | null;
    context: {
        currentModule: number;
        activeSeasonId?: string;
        activeDesignId?: string;
    };
    actions: {
        setStatus: (status: AgentStatus, message?: string | null) => void;
        setContext: (context: Partial<AgentState['context']>) => void;
        validateAction: (actionType: string, payload: any) => boolean;
    };
}

// 2. The Rule Engine (Mock for Phase 4)
const RULE_BOOK: Record<string, (ctx: any, payload: any) => string | null> = {
    // Rule: Cannot approve Cost Sheet if Margin is too low
    'APPROVE_COST': (ctx, payload) => {
        if (payload.margin < 0.55) { // 55%
            return "Margin Breach: Target is 60%. Please renegotiate fabric costs.";
        }
        return null; // OK
    },
    // Rule: Cannot create Design without a Season
    'CREATE_DESIGN': (ctx) => {
        if (!ctx.activeSeasonId) {
            return "Context Error: Please select a Season (Mod 1) first.";
        }
        return null;
    }
};

// 3. The Store (Brain)
export const useAgUiStore = create<AgentState>((set, get) => ({
    status: 'IDLE',
    message: null,
    context: {
        currentModule: 0,
    },
    actions: {
        setStatus: (status, message = null) => set({ status, message }),
        setContext: (newCtx) => set((state) => ({ context: { ...state.context, ...newCtx } })),

        // The Interceptor Function
        validateAction: (actionType, payload) => {
            const state = get();
            const rule = RULE_BOOK[actionType];

            if (!rule) return true; // No rule = Allowed

            set({ status: 'THINKING' });

            // Simulate "Thought" delay for UX
            const error = rule(state.context, payload);

            if (error) {
                set({ status: 'BLOCKED', message: error });
                return false; // Action Blocked
            }

            set({ status: 'IDLE', message: null });
            return true; // Action Allowed
        }
    }
}));
