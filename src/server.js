// eslint-disable-next-line import/newline-after-import
import { config } from 'dotenv';
config();

// eslint-disable-next-line import/first
import app from './app';

app.listen(process.env.PORT || 3333);
