import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || '5834',
};
