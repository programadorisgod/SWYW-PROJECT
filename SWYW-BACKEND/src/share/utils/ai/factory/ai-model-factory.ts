import type { AIModel } from '../interfaces/ai-model.interface';

export abstract class AIModelFactory {
    public getAIModel(): AIModel {
        const concreteAIModel = this.createAIModel();
        return concreteAIModel;
    }

    public abstract createAIModel(): AIModel;
}
