import { memo_dto, memo_get_dto } from './Dto/memo.dto';
import { MemoService } from './memo.service';
import { Memo } from './entity/memo.entity';
export declare class MemoController {
    private readonly memoService;
    constructor(memoService: MemoService);
    gen_feedback(memoDTO: memo_dto, req: any): Promise<any>;
    save_txt(memo_DTO: memo_dto, req: any): Promise<Memo>;
    recall_txt(memo_get_DTO: memo_get_dto, req: any): Promise<string>;
}
