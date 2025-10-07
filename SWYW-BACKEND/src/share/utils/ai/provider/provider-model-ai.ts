import type { AIModels } from '@src/share/types/ai';
import type { AIModelFactory } from '../factory/ai-model-factory';
import { GeminiModelFactory } from '../factory/gemini-model-factory';
import type { AIModel } from '../interfaces/ai-model.interface';
import { ENV_MODEL_AI } from '@src/config/app.config';
import { OpenAIModelFactory } from '../factory/openai-model-factory';

export class ProviderAIModel {
    public static _AIModels: Map<AIModels, AIModelFactory> = new Map<
        AIModels,
        AIModelFactory
    >([
        ['gemini', new GeminiModelFactory()],
        ['openAI', new OpenAIModelFactory()],
    ]);

    public static create(): AIModelFactory {
        const modelFactory = this._AIModels.get(ENV_MODEL_AI as AIModels);

        if (!modelFactory) {
            throw new Error('Model not found');
        }

        return modelFactory;
    }
}
