import { CommonService } from './common.service';
import { gen_roadmap_DTO } from './Dto/roadmap.dto';
import { change_concept_Dto, change_topic_Dto } from './Dto/passchange.dto';
export declare class CommonController {
    private readonly CommonService;
    constructor(CommonService: CommonService);
    gen_roadmap_content(RoadmapDto: gen_roadmap_DTO, req: any): Promise<void>;
    get_topic_list(req: any): Promise<string[]>;
    get_content_from_topic(RoadmapDto: gen_roadmap_DTO, req: any): Promise<string>;
    change_pass_topic(topic_dto: change_topic_Dto, req: any): Promise<void>;
    change_pass_concept(concept_dto: change_concept_Dto, req: any): Promise<void>;
}
