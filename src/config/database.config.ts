export default () => ({
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'Qwe.123*',
        name: process.env.DB_NAME ?? 'tech_help_desk',
    },
});