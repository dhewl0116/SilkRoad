"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const common_entity_1 = require("../src/common/Entity/common.entity");
const memo_entity_1 = require("../src/memo/entity/memo.entity");
exports.typeORMConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'dhewl',
    entities: [common_entity_1.Roadmap, memo_entity_1.Memo],
    synchronize: true
};
//# sourceMappingURL=typeorm.config.js.map