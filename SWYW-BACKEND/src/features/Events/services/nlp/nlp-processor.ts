import type { AIModel } from '@src/share/utils/ai/interfaces/ai-model.interface';
import type { createEventDto, eventDto } from '../../dto/event';
import { DIContainer } from '@src/container/container';
import { TOKENS } from '@src/container/tokens';
import { wrapperPromise } from '@src/share/utils/network/network';
import { unknown } from 'zod/v3';
import { prompt } from './prompt';

export class NlpProcessor {
    private readonly _ai: AIModel = DIContainer.getInstance().resolve<AIModel>(
        TOKENS.aiModel
    );
    async process(messageEvent: eventDto): Promise<Error | createEventDto> {
        const [err, response] = await wrapperPromise(
            this._ai.generate(prompt({ messageEvent }))
        );

        if (err) {
            console.log(err);
            return err;
        }
        if (!response) {
            return new Error('No response from AI model');
        }

        try {
            const createEventData: createEventDto = JSON.parse(response);
            return createEventData;
        } catch (err) {
            console.error('Error parsing AI response:', err);
            return new Error('Error parsing AI response');
        }
    }
}
