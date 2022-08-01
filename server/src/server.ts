import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import CrawlRoute from './routes/crawl.route';

validateEnv();

const app = new App([new IndexRoute(), new CrawlRoute()]);

app.listen();
