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
exports.MemoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const memo_repository_1 = require("./repository/memo.repository");
let MemoService = class MemoService {
    constructor(memoRepository, httpService) {
        this.memoRepository = memoRepository;
        this.httpService = httpService;
        this.apiKey = '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';
    }
    async gen_feedback(subject, topic, concept, memo, googleId) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `
                    The following note is about "${concept}" : '${memo}", salad, or meat between them'. 
                    This memo is a compilation of my study of this topic. 
                    First, look at the contents of this memo and rate your understanding of this topic from 0 to 100.
                    Second, please let us know what problems the user is misunderstanding in the content of this memo. 
                    Third, after reading this memo, please recommend things that the user might need to know more about this topic in the future, things that would be good to study, and advise on what needs to be supplemented in this memo. Please answer this question in JSON format only.


                    The JSON structure should be as follows:
                    json

                        {
                        "understanding": Understanding percent how much this note understands about the topic
                        "errors": [
                            {
                            "problem":problem in memo
                            },
                            ….
                            ],
                        "comments": [
                        {
                             "advise": advise in memo
                        },
                        ....
                        ]

                      
                    please check this JSON structure and my ask
                    `
                    }
                ],
                max_tokens: 4096,
                temperature: 0.3,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            }).pipe((0, rxjs_1.catchError)((error) => {
                console.error('Error generating text:', error);
                throw new common_1.HttpException('Failed to generate text', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })));
            let content = response.data.choices[0].message.content;
            if (content.trim().charAt(0) !== '{') {
                let lines = content.trim().split('\n');
                lines = lines.slice(1, -1);
                content = lines.join('\n');
            }
            this.save_memo(subject, topic, concept, memo, googleId);
            return content;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to generate feedback', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async save_memo(subject, topic, concept, memo, googleId) {
        return await this.memoRepository.saveMemo(subject, topic, concept, memo, googleId);
    }
    async get_memo(subject, topic, concept, googleId) {
        const foundMemo = await this.memoRepository.findMemo(subject, topic, concept, googleId);
        return foundMemo ? foundMemo.memo : null;
    }
};
exports.MemoService = MemoService;
exports.MemoService = MemoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(memo_repository_1.MemoRepository)),
    __metadata("design:paramtypes", [memo_repository_1.MemoRepository,
        axios_1.HttpService])
], MemoService);
//# sourceMappingURL=memo.service.js.map