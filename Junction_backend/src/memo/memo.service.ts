import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './entity/memo.entity'; // Entity 경로 확인
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { MemoRepository } from './repository/memo.repository';

@Injectable()
export class MemoService {
    private readonly apiKey = "your api key";
    constructor(
        @InjectRepository(MemoRepository)
        private readonly memoRepository:MemoRepository ,
        private readonly httpService: HttpService,
    ){}

    async gen_feedback(subject: string,topic: string, concept:string, memo: string, googleId:string) {
        try {
            const response: AxiosResponse<any> = await lastValueFrom(
              this.httpService.post(
                'https://api.openai.com/v1/chat/completions',
                {
                  model: 'gpt-4o',
                  messages: [
                    {
                      role: 'system',
                      content: 
                      `
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
                },
                {
                  headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                  },
                },
              ).pipe(
                catchError((error) => {
                  console.error('Error generating text:', error);
                  throw new HttpException(
                    'Failed to generate text',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  );
                }),
              ),
            );
        
            let content = response.data.choices[0].message.content;
            if (content.trim().charAt(0) !== '{') {
              let lines = content.trim().split('\n');

              // 첫 줄과 마지막 줄 제거
              lines = lines.slice(1, -1);

              // 다시 합치기
              content = lines.join('\n');
            }
            this.save_memo(subject, topic, concept, memo, googleId);
            return content;  // 응답 내용을 반환
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Failed to generate feedback',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    

    async save_memo(subject: string, topic: string, concept:string, memo:string,  googleId: string): Promise<Memo> {
      return await this.memoRepository.saveMemo(subject, topic, concept, memo, googleId);
    }

    async get_memo(subject:string, topic:string, concept:string, googleId:string):Promise<string>{
      const foundMemo = await this.memoRepository.findMemo(subject, topic, concept, googleId);
      return foundMemo ? foundMemo.memo : null;
    }

}
