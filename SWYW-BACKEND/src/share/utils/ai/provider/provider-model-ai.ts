import type { AIModels } from '@src/share/types/ai';
import type { AIModelFactory } from '../factory/ai-model-factory';
import { GeminiModelFactory } from '../factory/gemini-model-factory';
import type { AIModel } from '../interfaces/ai-model.interface';
import { ENV_MODEL_AI } from '@src/config/app.config';

export class ProviderAIModel {
    public static _AIModels: Map<AIModels, AIModelFactory> = new Map<
        AIModels,
        AIModelFactory
    >([['gemini', new GeminiModelFactory()]]);

    public static create(): AIModelFactory {
        const modelFactory = this._AIModels.get(ENV_MODEL_AI as AIModels);

        if (!modelFactory) {
            throw new Error('Model not found');
        }

        return modelFactory;
    }
}
