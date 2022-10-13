import { Router } from 'express';
import { Service } from './IService';

export interface Controller {
    router: Router;
}
