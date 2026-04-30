import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`, override: true });

export const {
    NODE_ENV,
    DATABASE_URL,
    CLOUDINARY_URL,
    NEXT_PUBLIC_BASE_URL,
} = process.env;