import { Memo } from './entity/memo.entity';
import { HttpService } from '@nestjs/axios';
import { MemoRepository } from './repository/memo.repository';
export declare class MemoService {
    private readonly memoRepository;
    private readonly httpService;
    private readonly apiKey;
    constructor(memoRepository: MemoRepository, httpService: HttpService);
    gen_feedback(subject: string, topic: string, concept: string, memo: string, googleId: string): Promise<any>;
    save_memo(subject: string, topic: string, concept: string, memo: string, googleId: string): Promise<Memo>;
    get_memo(subject: string, topic: string, concept: string, googleId: string): Promise<string>;
}
