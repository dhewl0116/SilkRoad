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
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const common_repository_1 = require("./repository/common.repository");
let CommonService = class CommonService {
    constructor(httpService, roadmapRepository) {
        this.httpService = httpService;
        this.roadmapRepository = roadmapRepository;
        this.apiKey = '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';
    }
    async generateText(subject, user) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `Please provide a comprehensive roadmap in JSON format for the topic of ${subject}. The roadmap should include the following sections:
              1. Topic: Major areas or stages related to ${subject}.
              2. Description: A brief explanation of each topic.
              3. Learning Goals: Goals to achieve in each topic.
              4. Recommended Resources: Recommended learning materials and links related to each topic.
              5. Latest Trends or Technologies: The latest technologies and trends related to each topic.
              6. Practical Projects: Ideas for practical projects related to each topic.
              The JSON structure should be as follows:
              json
              {
              "roadmap": [
                  {
                  "title": "Topic Title",
                  "description": "A brief explanation of the topic.",
                  "pass": false,
                  "topics": [
                      {
                      "title": "Subtopic Title",
                      "description": "A brief explanation of the subtopic.",
                      "pass": false,
                      "learning_goals": [
                          "Learning Goal 1",
                          "Learning Goal 2"
                      ],
                      "recommendations": [
                          "Recommended Resource 1 Link",
                          "Recommended Resource 2 Link"
                      ],
                      "latest_trends": [
                          "Latest Technology 1",
                          "Latest Technology 2"
                      ],
                      "projects": [
                          "Practical Project 1",
                          "Practical Project 2"
                      ]
                      }
                  ]
                  }
              ]
              }
              Please provide information for around 10 topics in a structured manner in detail, so that beginners can use the roadmap to advance to an expert level.
              Don't write anything except of JSON, JUST JSON.
              `
                    }
                ],
                max_tokens: 4096,
                temperature: 0.4,
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
            const now = new Date();
            const existingRoadmap = await this.roadmapRepository.findOne({
                where: { googleId: user.googleId, subject: subject },
                order: { created_at: 'DESC' }
            });
            if (existingRoadmap) {
                existingRoadmap.content = content;
                existingRoadmap.updated_at = now;
                await this.roadmapRepository.save(existingRoadmap);
            }
            else {
                const newRoadmap = this.roadmapRepository.create({
                    googleId: user.googleId,
                    subject: subject,
                    content: content,
                    created_at: now,
                });
                await this.roadmapRepository.save(newRoadmap);
            }
        }
        catch (error) {
            console.error('Error generating or saving text:', error);
            throw new common_1.HttpException('Failed to generate or save text', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRecentSubjects(user) {
        try {
            const roadmaps = await this.roadmapRepository.find({
                where: { googleId: user.googleId },
                order: { updated_at: 'DESC' }
            });
            const subjects = roadmaps.map(roadmap => roadmap.subject);
            return subjects;
        }
        catch (error) {
            console.error('Error retrieving recent topics:', error);
            throw new common_1.HttpException('Failed to retrieve recent topics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRoadmapContent(user, subject) {
        try {
            const roadmap = await this.roadmapRepository.findOne({
                where: { googleId: user.googleId, subject: subject }
            });
            if (!roadmap) {
                throw new common_1.HttpException('Roadmap not found', common_1.HttpStatus.NOT_FOUND);
            }
            return roadmap.content;
        }
        catch (error) {
            console.error('Error retrieving roadmap content:', error);
            throw new common_1.HttpException('Failed to retrieve roadmap content', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTopicPassStatus(googleId, subject, topic) {
        try {
            const roadmap = await this.roadmapRepository.findOne({
                where: { googleId, subject },
            });
            if (!roadmap) {
                throw new common_1.HttpException('Roadmap not found', common_1.HttpStatus.NOT_FOUND);
            }
            let roadmapContent = JSON.parse(roadmap.content);
            const matchingSection = roadmapContent.roadmap.find((section) => section.title === topic);
            if (!matchingSection) {
                throw new common_1.HttpException('Title not found in the roadmap', common_1.HttpStatus.NOT_FOUND);
            }
            matchingSection.pass = true;
            roadmap.content = JSON.stringify(roadmapContent);
            await this.roadmapRepository.save(roadmap);
        }
        catch (error) {
            console.error('Error updating pass status:', error);
            throw new common_1.HttpException('Failed to update pass status', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateconceptPassStatus(googleId, subject, topic, concept) {
        const roadmap = await this.roadmapRepository.findOne({
            where: { googleId, subject },
        });
        if (!roadmap) {
            throw new common_1.HttpException('Roadmap not found', common_1.HttpStatus.NOT_FOUND);
        }
        let roadmapContent = JSON.parse(roadmap.content);
        const targetTopic = roadmapContent.roadmap.find((t) => t.title === topic);
        if (!targetTopic) {
            throw new common_1.HttpException('Topic not found', common_1.HttpStatus.NOT_FOUND);
        }
        const targetConcept = targetTopic.topics.find((c) => c.title === concept);
        if (!targetConcept) {
            throw new common_1.HttpException('Concept not found', common_1.HttpStatus.NOT_FOUND);
        }
        targetConcept.pass = true;
        roadmap.content = JSON.stringify(roadmapContent);
        await this.roadmapRepository.save(roadmap);
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(common_repository_1.RoadmapRepository)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        common_repository_1.RoadmapRepository])
], CommonService);
//# sourceMappingURL=common.service.js.map