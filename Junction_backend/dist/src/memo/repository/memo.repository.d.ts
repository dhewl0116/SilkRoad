import { DataSource, Repository } from "typeorm";
import { Memo } from "../entity/memo.entity";
export declare class MemoRepository extends Repository<Memo> {
    constructor(dataSource: DataSource);
    findMemo(subject: string, topic: string, concept: string, googleId: string): Promise<Memo | undefined>;
    saveMemo(subject: string, topic: string, concept: string, memo: string, googleId: string): Promise<Memo>;
}
