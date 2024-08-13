import { DataSource, Repository } from "typeorm";
import { Roadmap } from "../Entity/common.entity";
export declare class RoadmapRepository extends Repository<Roadmap> {
    constructor(dataSource: DataSource);
}
