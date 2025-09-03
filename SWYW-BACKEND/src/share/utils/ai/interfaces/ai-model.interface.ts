export interface AIModel {
    generate(prompt: string): Promise<string>;
}
