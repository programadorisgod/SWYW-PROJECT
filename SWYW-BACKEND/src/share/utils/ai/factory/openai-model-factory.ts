import type { AIModel } from '../interfaces/ai-model.interface';
import { OpenAIModel } from '../models/open-ai/open-ai';
import { AIModelFactory } from './ai-model-factory';

export class OpenAIModelFactory extends AIModelFactory {
    public override createAIModel(): AIModel {
        return new OpenAIModel();
    }
}
