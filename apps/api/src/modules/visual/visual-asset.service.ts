import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class VisualAssetService {
    constructor(private prisma: PrismaService) { }

    // 1. Ingest Real Asset (Upload)
    async ingestAsset(userId: string, url: string, type: 'sketches' | 'mood') {
        return this.prisma.visualAsset.create({
            data: {
                url,
                type: type === 'sketches' ? 'SKETCH' : 'MOOD',
                aiLabel: 'REAL', // Authenticated Upload
                confidenceScore: 1.0,
            }
        });
    }

    // 2. Save Generative Asset (AI Output)
    async saveGenerativeAsset(
        parentId: string,
        url: string,
        prompt: string
    ) {
        // Strict Genealogy: Link Child to Parent
        const parent = await this.prisma.visualAsset.findUnique({ where: { id: parentId } });
        if (!parent) throw new Error("Parent Asset not found");

        return this.prisma.visualAsset.create({
            data: {
                url,
                type: 'REMIX',
                aiLabel: 'DERIVED', // <-- Anti-Hallucination Protocol
                parentId: parent.id,
                confidenceScore: 0.95, // AI Confidence
                // In real app, we'd store the Prompt in a separate meta table or JSON field
            }
        });
    }

    // 3. Similarity Search (pgvector)
    async findSimilarAssets(embeddingVector: number[]) {
        // This uses raw SQL because Prisma native vector support is still experimental/custom
        return this.prisma.$queryRaw`
      SELECT id, url, "aiLabel", 1 - (embedding <=> ${embeddingVector}::vector) as similarity
      FROM "VisualAsset"
      WHERE 1 - (embedding <=> ${embeddingVector}::vector) > 0.8
      ORDER BY similarity DESC
      LIMIT 10;
    `;
    }
}
