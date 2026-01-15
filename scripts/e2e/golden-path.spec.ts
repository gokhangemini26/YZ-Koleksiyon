import { test, expect } from '@playwright/test';

test.describe('The Golden Path: Concept to Production', () => {

    test('Full Lifecycle Simulation', async ({ request }) => {
        // 1. GM: Create Season (Mod 1)
        const seasonRes = await request.post('/api/strategy/seasons', {
            data: { name: 'SS26 High Summer', budget: 500000, skuTarget: 50 }
        });
        expect(seasonRes.ok()).toBeTruthy();
        const season = await seasonRes.json();
        console.log(`[E2E] Created Season: ${season.id}`);

        // 2. Designer: Create Design Slot (Mod 3)
        const designRes = await request.post('/api/collection/designs', {
            data: { seasonId: season.id, category: 'Dress', pricePoint: 'PREMIUM' }
        });
        const design = await designRes.json();
        console.log(`[E2E] Created Design Slot: ${design.id}`);

        // 3. Designer: Generate Visual Asset (Mod 5)
        // Simulating the AI Agent response
        const visualRes = await request.post('/api/visual/generate', {
            data: { prompt: 'Floral Silk Midi Dress', parentId: null }
        });
        const visual = await visualRes.json();
        expect(visual.aiLabel).toBe('DERIVED'); // Anti-Hallucination check

        // 4. Production: Calculate Cost (Mod 7)
        const costRes = await request.post(`/api/costing/${design.id}`, {
            data: {
                fabricPrice: 12.50,
                fabricYield: 2.5, // 2.5 meters
                makePrice: 15.00,
                logistics: 2.00,
                dutyPercent: 10
            }
        });
        const costSheet = await costRes.json();
        console.log(`[E2E] Calculated Cost: $${costSheet.landedCost}`);

        // 5. Margin Check (Policy Guard)
        // If margin is good (implied from cost), it should be approvable
        expect(costSheet.marginAchieved).toBeTruthy();

        // 6. GM: Final Approval (Mod 8)
        const approveRes = await request.post('/api/approval', {
            data: { entityId: design.id, type: 'DESIGN', verdict: 'APPROVED' }
        });
        expect(approveRes.ok()).toBeTruthy();
        console.log(`[E2E] Design APPROVED for Production.`);
    });
});
