"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoModule = void 0;
const common_1 = require("@nestjs/common");
const memo_controller_1 = require("./memo.controller");
const memo_service_1 = require("./memo.service");
const jwt_guard_1 = require("../auth/Guard/jwt.guard");
const axios_1 = require("@nestjs/axios");
const memo_repository_1 = require("./repository/memo.repository");
let MemoModule = class MemoModule {
};
exports.MemoModule = MemoModule;
exports.MemoModule = MemoModule = __decorate([
    (0, common_1.Module)({
        controllers: [memo_controller_1.MemoController],
        providers: [memo_service_1.MemoService, jwt_guard_1.JwtAuthGuard, memo_repository_1.MemoRepository],
        imports: [axios_1.HttpModule]
    })
], MemoModule);
//# sourceMappingURL=memo.module.js.map