import { Router } from 'express';
import CrawlController from '@/controllers/crawl.controller';
import { Routes } from '@interfaces/routes.interface';

class CrawlRoute implements Routes {
  public path = '/';
  public router = Router();
  public crawlController = new CrawlController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}crawl`, this.crawlController.getData);
    this.router.get(`${this.path}list-keys`, this.crawlController.getKeys);
    this.router.delete(`${this.path}clear-keys`, this.crawlController.clearKeys);
  }
}

export default CrawlRoute;
