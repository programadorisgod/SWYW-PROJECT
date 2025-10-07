import type { AIModel } from '../../interfaces/ai-model.interface';
import { AI_URL, GITHUB_TOKEN } from '@src/config/app.config';

const model = 'openai/gpt-5-nano';

export class OpenAIModel implements AIModel {
    async generate(prompt: string): Promise<string> {
        console.log('Sending prompt to OpenAIModel:', prompt);

        const response = await fetch(`${AI_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('GitHub Models API error:', text);
            throw new Error(`GitHub Models API returned ${response.status}`);
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            console.error('Invalid or empty AI response:', data);
            throw new Error('No content received from model');
        }

        console.log('Response from OpenAIModel:', content);
        return content;
    }
}
