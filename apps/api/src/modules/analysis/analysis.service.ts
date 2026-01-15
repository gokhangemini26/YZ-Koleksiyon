import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AnalysisService {
    constructor(private prisma: PrismaService) { }

    // 1. Ingest Sales Data (Webhook from Shopify/ERP)
    async ingestSalesData(sku: string, unitsSold: number, returns: number) {
        // Upsert performance metric
        // In real app, calculate rates based on existing stock
        const sellThrough = 0.75; // Mock calculation

        return this.prisma.performanceMetric.upsert({
            where: { sku },
            create: {
                sku,
                sellThroughRate: sellThrough,
                returnRate: returns / unitsSold,
                customerSentiment: 0.8
            },
            update: {
                sellThroughRate: sellThrough,
                returnRate: returns / unitsSold
            }
        });
    }

    // 2. AI Insight Generation
    async generateNextSeasonInsights(seasonId: string) {
        // Analyze all products in the season
        // Find correlation between "Red" and "High Sell Through"

        return {
            topPerformers: ["Floral Maxi Dress", "Silk Blouse"],
            underPerformers: ["Wool Trousers"],
            insight: "Floral prints outperformed solids by 25%. Maintain floral ratio for next season.",
            actionItem: "Increase Print budget in Mod 1 Strategy."
        };
    }
}
