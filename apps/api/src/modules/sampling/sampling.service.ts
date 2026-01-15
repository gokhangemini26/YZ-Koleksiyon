import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SamplingService {
    constructor(private prisma: PrismaService) { }

    async createSampleRequest(designId: string, stage: 'PROTO_1' | 'PROTO_2' | 'SMS') {
        // 1. Generate QR Payload
        const trackingId = `SPL-${uuidv4().substring(0, 8).toUpperCase()}`;
        const qrPayload = `https://fashionerp.ai/track/${trackingId}`;

        // 2. Create Record
        const sample = await this.prisma.sample.create({
            data: {
                designId,
                stage: stage as any, // Enum mapping needed in real app
                trackingId,
                status: 'PENDING',
                qaComments: {}
            }
        });

        return {
            sampleId: sample.id,
            trackingId: sample.trackingId,
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrPayload)}`
        };
    }

    async recordFitComment(trackingId: string, verdict: 'APPROVED' | 'REJECTED', comments: string) {
        // Find sample by tracking ID
        const sample = await this.prisma.sample.findFirst({ where: { trackingId } });
        if (!sample) throw new Error("Sample not found");

        return this.prisma.sample.update({
            where: { id: sample.id },
            data: {
                status: verdict,
                qaComments: {
                    timestamp: new Date(),
                    verdict,
                    note: comments
                }
            }
        });
    }
}
