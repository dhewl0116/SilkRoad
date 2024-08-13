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
exports.MemoController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/Guard/jwt.guard");
const memo_dto_1 = require("./Dto/memo.dto");
const memo_service_1 = require("./memo.service");
let MemoController = class MemoController {
    constructor(memoService) {
        this.memoService = memoService;
    }
    async gen_feedback(memoDTO, req) {
        console.log('submit');
        const { subject, topic, concept, memo } = memoDTO;
        return await this.memoService.gen_feedback(subject, topic, concept, memo, req.user.googleId);
    }
    async save_txt(memo_DTO, req) {
        console.log("save");
        const { subject, topic, concept, memo } = memo_DTO;
        return await this.memoService.save_memo(subject, topic, concept, memo, req.user.googleId);
    }
    async recall_txt(memo_get_DTO, req) {
        console.log("recall");
        const { subject, topic, concept } = memo_get_DTO;
        return await this.memoService.get_memo(subject, topic, concept, req.user.googleId);
    }
};
exports.MemoController = MemoController;
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memo_dto_1.memo_dto, Object]),
    __metadata("design:returntype", Promise)
], MemoController.prototype, "gen_feedback", null);
__decorate([
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memo_dto_1.memo_dto, Object]),
    __metadata("design:returntype", Promise)
], MemoController.prototype, "save_txt", null);
__decorate([
    (0, common_1.Get)('recall'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memo_dto_1.memo_get_dto, Object]),
    __metadata("design:returntype", Promise)
], MemoController.prototype, "recall_txt", null);
exports.MemoController = MemoController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('memo'),
    __metadata("design:paramtypes", [memo_service_1.MemoService])
], MemoController);
//# sourceMappingURL=memo.controller.js.map