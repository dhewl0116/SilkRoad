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
Object.defineProperty(exports, "__esModule", { value: true });
exports.memo_get_dto = exports.memo_dto = void 0;
const class_validator_1 = require("@nestjs/class-validator");
class memo_dto {
}
exports.memo_dto = memo_dto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_dto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_dto.prototype, "topic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_dto.prototype, "concept", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_dto.prototype, "memo", void 0);
class memo_get_dto {
}
exports.memo_get_dto = memo_get_dto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_get_dto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_get_dto.prototype, "topic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], memo_get_dto.prototype, "concept", void 0);
//# sourceMappingURL=memo.dto.js.map