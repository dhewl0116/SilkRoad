import { HttpService } from '@nestjs/axios';
import { Payload } from 'src/auth/jwt.payload';
import { RoadmapRepository } from './repository/common.repository';
export declare class CommonService {
    private readonly httpService;
    private readonly roadmapRepository;
    private readonly apiKey;
    constructor(httpService: HttpService, roadmapRepository: RoadmapRepository);
    generateText(subject: string, user: Payload): Promise<void>;
    getRecentSubjects(user: Payload): Promise<string[]>;
    getRoadmapContent(user: Payload, subject: string): Promise<string>;
    updateTopicPassStatus(googleId: string, subject: string, topic: string): Promise<void>;
    updateconceptPassStatus(googleId: string, subject: string, topic: string, concept: string): Promise<void>;
}
