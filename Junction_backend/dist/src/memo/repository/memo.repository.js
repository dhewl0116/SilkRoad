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
exports.MemoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const memo_entity_1 = require("../entity/memo.entity");
let MemoRepository = class MemoRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(memo_entity_1.Memo, dataSource.createEntityManager());
    }
    async findMemo(subject, topic, concept, googleId) {
        return await this.findOne({ where: { subject, topic, concept, googleId } });
    }
    async saveMemo(subject, topic, concept, memo, googleId) {
        const existingMemo = await this.findOne({ where: { subject, topic, concept, googleId } });
        if (existingMemo) {
            existingMemo.memo = memo;
            return await this.save(existingMemo);
        }
        else {
            const newMemo = this.create({ subject, topic, concept, memo, googleId });
            return await this.save(newMemo);
        }
    }
};
exports.MemoRepository = MemoRepository;
exports.MemoRepository = MemoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MemoRepository);
//# sourceMappingURL=memo.repository.js.map