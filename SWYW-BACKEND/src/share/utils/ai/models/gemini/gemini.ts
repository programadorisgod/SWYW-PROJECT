import { GoogleGenAI } from '@google/genai';
import type { AIModel } from '../../interfaces/ai-model.interface';
import { GEMINI_API_KEYI } from '@src/config/app.config';

export class GeminiModel implements AIModel {
    private readonly _ai: GoogleGenAI;
    constructor() {
        this._ai = new GoogleGenAI({
            apiKey: GEMINI_API_KEYI,
        });
    }
    async generate(prompt: string): Promise<string> {
        const response = await this._ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || '';
    }
}
