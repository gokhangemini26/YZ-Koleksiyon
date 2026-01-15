import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CostingService {
    constructor(private prisma: PrismaService) { }

    async calculateAndValidateCost(designId: string, costs: {
        fabricPrice: number;
        fabricYield: number;
        makePrice: number;
        logistics: number;
        dutyPercent: number;
    }) {
        // 1. Calculate Landed Cost
        const fabricCost = costs.fabricPrice * costs.fabricYield;
        const dutyCost = (fabricCost + costs.makePrice) * (costs.dutyPercent / 100);
        const landedCost = fabricCost + costs.makePrice + costs.logistics + dutyCost;

        // 2. Fetch Strategy Target (via Design -> LinePlan -> Season -> Strategy)
        const design = await this.prisma.productDesign.findUnique({
            where: { id: designId },
            include: {
                linePlan: {
                    include: {
                        season: { include: { strategyDoc: true } }
                    }
                }
            }
        });

        if (!design || !design.linePlan || !design.linePlan.season.strategyDoc) {
            throw new Error("Missing Strategy Context for this Design");
        }

        const { targetMargin } = design.linePlan.season.strategyDoc;
        // targetMargin is stored as decimal e.g. 0.60 for 60%
        // Retail = Cost / (1 - Margin)

        // We assume a standard target Retail based on price point, 
        // but here let's calculate the IMPLIED Retail to hit margin.
        const impliedRetail = landedCost / (1 - Number(targetMargin));

        // 3. Margin Guard
        // If the implied retail is unreasonably high for the category/pricepoint, warn.
        // simplistic check: returned object contains status.

        const status = {
            landedCost,
            requiredRetail: impliedRetail,
            marginAchieved: true, // simplified
            meta: {
                fabricCost,
                dutyCost
            }
        };

        // Save to DB (CostSheet)
        await this.prisma.costSheet.upsert({
            where: { designId },
            create: {
                designId,
                rawMaterial: fabricCost,
                labor: costs.makePrice,
                logistics: costs.logistics,
                duty: dutyCost,
                targetRetail: impliedRetail,
                wholesalePrice: impliedRetail * 0.4,
                isApproved: false
            },
            update: {
                rawMaterial: fabricCost,
                labor: costs.makePrice,
                logistics: costs.logistics,
                duty: dutyCost,
                targetRetail: impliedRetail
            }
        });

        return status;
    }
}
