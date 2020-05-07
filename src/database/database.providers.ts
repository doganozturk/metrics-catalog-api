import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './database.constants';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
    },
];
