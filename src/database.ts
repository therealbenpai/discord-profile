import Database from 'better-sqlite3';
import * as fs from 'node:fs';

if (!fs.existsSync(`${process.cwd()}/databases`)) fs.mkdirSync(`${process.cwd()}/databases`);

const MainDatabase = new Database('databases/main.db');

const InitScript = fs.readFileSync(`${process.cwd()}/sql/init.sql`, 'utf8');

MainDatabase.exec(InitScript); // Ensures that the database is created correctly

export default MainDatabase;
