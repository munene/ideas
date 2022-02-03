import { useContainer } from 'class-validator';
import 'reflect-metadata';
import Container from 'typedi';

useContainer(Container);
export * from './interfaces';
export * as PersistenceModule from './persistence';