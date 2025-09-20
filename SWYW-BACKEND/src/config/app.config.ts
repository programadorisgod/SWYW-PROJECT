import { z } from 'zod';
const enviromentVariables = z.object({
    PORT: z.string().min(4).max(5).default('3000'),
    DATABASE_URL: z
        .string()
        .min(1)
        .default('postgresql://user:password@localhost:5432/dbname'),
    TYPE_DATABASE: z.string().default('postgresql'),
    GEMINI_API_KEYI: z.string().default('GEMINI_API_KEYI'),
    ENV_MODEL_AI: z.string().default('gemini'),
    DATABASE_URL_ADMIN: z
        .string()
        .min(1)
        .default('postgresql://user:password@localhost:5432/dbname'),
});

const { success, error, data } = enviromentVariables.safeParse(process.env);

if (!success) {
    console.error('Invalid environment variables:', error);
    throw new Error('Invalid environment variables');
}

export const {
    DATABASE_URL,
    PORT,
    TYPE_DATABASE,
    GEMINI_API_KEYI,
    ENV_MODEL_AI,
    DATABASE_URL_ADMIN,
} = data;
