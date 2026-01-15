import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto, ip?: string) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        // Log attempt consistently
        if (!user) {
            // We need to find user ID if possible for logging, or log as unknown
            const existingUser = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
            if (existingUser) {
                await this.prisma.loginLog.create({
                    data: {
                        userId: existingUser.id,
                        success: false,
                        ip: ip,
                        details: 'Invalid password'
                    }
                })
            }
            throw new UnauthorizedException('Invalid credentials');
        }

        // Log success
        await this.prisma.loginLog.create({
            data: {
                userId: user.id,
                success: true,
                ip: ip,
            }
        });

        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(registerDto.password, salt);

        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                passwordHash: passwordHash,
                name: registerDto.name,
            },
        });

        const { passwordHash: _, ...result } = user;
        return result;
    }
}
