"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const common_service_1 = require("./common.service");
const roadmap_dto_1 = require("./Dto/roadmap.dto");
const jwt_guard_1 = require("../auth/Guard/jwt.guard");
const passchange_dto_1 = require("./Dto/passchange.dto");
let CommonController = class CommonController {
    constructor(CommonService) {
        this.CommonService = CommonService;
    }
    async gen_roadmap_content(RoadmapDto, req) {
        const user = req.user;
        const subject = RoadmapDto.subject;
        await this.CommonService.generateText(subject, user);
    }
    async get_topic_list(req) {
        const user = req.user;
        return await this.CommonService.getRecentSubjects(user);
    }
    async get_content_from_topic(RoadmapDto, req) {
        const user = req.user;
        const subject = RoadmapDto.subject;
        return await this.CommonService.getRoadmapContent(user, subject);
    }
    async change_pass_topic(topic_dto, req) {
        const { subject, topic } = topic_dto;
        await this.CommonService.updateTopicPassStatus(req.user.googleId, subject, topic);
    }
    async change_pass_concept(concept_dto, req) {
        const { subject, topic, concept } = concept_dto;
        await this.CommonService.updateconceptPassStatus(req.user.googleId, subject, topic, concept);
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Post)('/gpt'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roadmap_dto_1.gen_roadmap_DTO, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "gen_roadmap_content", null);
__decorate([
    (0, common_1.Get)('/subject'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "get_topic_list", null);
__decorate([
    (0, common_1.Post)('/content'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roadmap_dto_1.gen_roadmap_DTO, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "get_content_from_topic", null);
__decorate([
    (0, common_1.Post)('/pass/topic'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [passchange_dto_1.change_topic_Dto, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "change_pass_topic", null);
__decorate([
    (0, common_1.Post)('/pass/concept'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [passchange_dto_1.change_concept_Dto, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "change_pass_concept", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)('common'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [common_service_1.CommonService])
], CommonController);
//# sourceMappingURL=common.controller.js.map