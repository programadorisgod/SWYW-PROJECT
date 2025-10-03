import type { AIModel } from '../../interfaces/ai-model.interface';
import { GEMINI_API_KEYI, GITHUB_TOKEN } from '@src/config/app.config';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
const token = GITHUB_TOKEN;
const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-5-mini';

export class GeminiModel implements AIModel {
    private readonly _ai: ReturnType<typeof ModelClient>;
    constructor() {
        this._ai = ModelClient(endpoint, new AzureKeyCredential(token));
    }
    async generate(prompt: string): Promise<string> {
        const response = await this._ai.path('/chat/completions').post({
            body: {
                messages: [{ role: 'user', content: prompt }],
                model: model,
            },
        });

        console.log('Gemini API response status:', response.status);

        if (isUnexpected(response)) {
            throw response.body.error;
        }

        if (!response.body.choices || response.body.choices.length === 0) {
            throw new Error('No response choices received from the model');
        }

        const content = response.body.choices[0]?.message?.content;
        if (content === null || content === undefined) {
            throw new Error('No content received from the model');
        }

        console.log(content);

        return content;
    }
}
