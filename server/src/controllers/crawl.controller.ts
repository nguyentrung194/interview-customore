import { NextFunction, Request, Response } from 'express';
import crawlService from '@services/crawl.service';

class TestsController {
  public crawlService = new crawlService();

  public getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keyword = req.query.search;
      const crawlData: any = await this.crawlService.getData(keyword);

      res.status(200).json({ data: crawlData, message: `crawl data by ${keyword}` });
    } catch (error) {
      next(error);
    }
  };

  public getKeys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listKeysData: any = await this.crawlService.getKeys();

      res.status(200).json({ data: listKeysData, message: 'list Keys' });
    } catch (error) {
      next(error);
    }
  };

  public clearKeys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.crawlService.clearKeys();

      res.status(204).json({ data: 'oke', message: 'clear keys success' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestsController;
