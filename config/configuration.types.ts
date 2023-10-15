export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type Configuration = {
  db: DatabaseConfig;
};
