import 'reflect-metadata';
import 'dotenv/config'
import { useContainer } from 'typeorm';
import Container from 'typedi';

useContainer(Container);

export * from './enums';
export * from './interfaces';
export * from './models';
export * as PersistenceModule from './persistence';