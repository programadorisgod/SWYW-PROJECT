import { z } from 'zod';
const enviromentVariables = z.object({
    PORT: z.string().min(4).max(5).default('3000'),
    DATABASE_URL_DEV: z
        .string()
        .min(1)
        .default('postgresql://user:password@localhost:5432/dbname'),
    TYPE_DATABASE: z.string().default('postgresql'),
    GEMINI_API_KEYI: z.string().default('GEMINI_API_KEYI'),
    GITHUB_TOKEN: z.string().default('GITHUB_TOKEN'),
    ENV_MODEL_AI: z.string().default('gemini'),
    DATABASE_URL_PROD: z
        .string()
        .min(1)
        .default('postgresql://user:password@localhost:5432/dbname'),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
});

const { success, error, data } = enviromentVariables.safeParse(process.env);

if (!success) {
    console.error('Invalid environment variables:', error);
    throw new Error('Invalid environment variables');
}

export const {
    DATABASE_URL_PROD,
    PORT,
    TYPE_DATABASE,
    GEMINI_API_KEYI,
    ENV_MODEL_AI,
    DATABASE_URL_DEV,
    NODE_ENV,
    GITHUB_TOKEN,
} = data;

export const DB_URL =
    NODE_ENV === 'development' ? DATABASE_URL_DEV : DATABASE_URL_PROD;
