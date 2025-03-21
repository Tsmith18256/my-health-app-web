import postgres from 'postgres';

export const sql = postgres(
  'postgres://postgres:postgres@localhost:5432/myhealthapp',
);
