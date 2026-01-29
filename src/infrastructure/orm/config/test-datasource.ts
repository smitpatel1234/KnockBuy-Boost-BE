import { DataSource } from 'typeorm';

import { Envvar } from './ormconfig';

export const TestDataSource = new DataSource({
    database: 'e_commerce_test', // Overriding database name for testing
    entities: [__dirname + '/../entities/*{.ts,.js}'],
    host: Envvar.dbhost,
    logging: false, // Disable logging for cleaner test output
    password: Envvar.dbpassword,
    port: Envvar.dbport,
    synchronize: true, // Auto sync schema for tests
    timezone: 'Z',
    type: 'mysql',
    username: Envvar.dbusername,
});
