import type { AIModel } from '../interfaces/ai-model.interface';
import { GeminiModel } from '../models/gemini/gemini';
import { AIModelFactory } from './ai-model-factory';

export class GeminiModelFactory extends AIModelFactory {
    public override createAIModel(): AIModel {
        return new GeminiModel();
    }
}
