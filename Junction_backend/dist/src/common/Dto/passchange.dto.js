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
exports.change_concept_Dto = exports.change_topic_Dto = void 0;
const class_validator_1 = require("class-validator");
class change_topic_Dto {
}
exports.change_topic_Dto = change_topic_Dto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], change_topic_Dto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], change_topic_Dto.prototype, "topic", void 0);
class change_concept_Dto {
}
exports.change_concept_Dto = change_concept_Dto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], change_concept_Dto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], change_concept_Dto.prototype, "topic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], change_concept_Dto.prototype, "concept", void 0);
//# sourceMappingURL=passchange.dto.js.map