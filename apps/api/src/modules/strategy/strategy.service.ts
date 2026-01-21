import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class StrategyService {
    constructor(private prisma: PrismaService) { }

    async createSeason(data: { name: string; budget: number; skuTarget: number }) {
        // 1. Validate Business Logic
        if (data.budget < 10000) {
            throw new BadRequestException('Minimum budget is $10k');
        }

        // 2. Transaction: Create Season + Strategy Doc
        return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const season = await tx.season.create({
                data: {
                    name: data.name,
                    startDate: new Date(),
                    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
                    status: 'PLANNED',
                },
            });

            await tx.strategyDoc.create({
                data: {
                    seasonId: season.id,
                    budgetCap: data.budget,
                    skuTargetCount: data.skuTarget,
                    targetMargin: 0.60, // Default 60%
                    keyDates: {},
                },
            });

            return season;
        });
    }

    async getActiveStrategies() {
        return this.prisma.season.findMany({
            where: { status: 'ACTIVE' },
            include: { strategyDoc: true },
        });
    }
}
