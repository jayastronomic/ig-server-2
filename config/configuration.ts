export default () => {
  return {
    db: {
      host: +process.env.DB_HOST,
      port: process.env.DB_PORT || 5433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    cache: {
      port: +process.env.REDIS_PORT || 6378,
      host: process.env.REDIS_HOST,
    },
    mailer: {
      host: process.env.MAILER_HOST,
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  };
};
