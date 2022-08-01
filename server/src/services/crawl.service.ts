import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const redis = require('redis');
const client = redis.createClient('redis://20.196.66.40:6380');
client.connect();
client.on('error', function (error) {
  console.error(error);
});
client.on('connect', () => console.log('client is connect'));
client.on('reconnecting', () => console.log('client is reconnecting'));
client.on('ready', () => console.log('client is ready'));

function findTextAndReturnRemainder(target, variable) {
  const chopFront = target.substring(
    target.search(variable) + variable.length,
    target.length,
  );
  const result = chopFront.substring(0, chopFront.search('};'));
  return JSON.parse(result + '}');
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function crawlPageLazada(dataLazada, page, keyword, numPage, brands?) {
  await page.goto(`https://www.lazada.vn/catalog/?page=${numPage}&q=${keyword}`, {
    waitUntil: ['domcontentloaded'],
  });
  await autoScroll(page);
  const html = await page.evaluate(() => document.querySelector('*').outerHTML);
  const $ = cheerio.load(html);
  const text = $($('script')).text();
  $('[data-qa-locator=product-item] a').each((index, el) => {
    const textHtml = $(el).text();
    if (!!textHtml) {
      dataLazada.push(textHtml.toLowerCase());
    }
  });

  if (!!brands) {
    const result = findTextAndReturnRemainder(text, 'window.pageData =');
    result?.mods?.filter?.filterItems[1]?.options.map(option => {
      brands.push(option?.title.toLowerCase());
    });
  }
}

async function crawlPageShopee(dataShopee, page, keyword, numPage, brands?) {
  await page.goto(`https://shopee.vn/search?keyword=${keyword}&page=${numPage}`, {
    waitUntil: ['domcontentloaded', 'networkidle0', 'networkidle2', 'load'],
  });
  await page.$eval('.shopee-filter-group__toggle-btn', el => el.click());
  await autoScroll(page);
  const html = await page.evaluate(() => document.querySelector('*').outerHTML);
  const $ = cheerio.load(html);
  $('[data-sqe=item] [data-sqe=name]>div:first-child').each((index, el) => {
    const textHtml = $(el).first().text();
    dataShopee.push(textHtml.toLowerCase());
  });

  if (!!brands) {
    $('.shopee-brands-filter .shopee-checkbox__label').each((index, el) => {
      const textHtml = $(el).text();
      brands.push(textHtml.toLowerCase());
    });
  }
}

async function searchKeyword(keyword) {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const [page] = await browser.pages();
    await page.setViewport({
      width: 1200,
      height: 800,
    });
    const dataShopee = [];
    const dataLazada = [];
    const brands = [];
    await crawlPageShopee(dataShopee, page, keyword, 0, brands);
    await crawlPageShopee(dataShopee, page, keyword, 1);

    await crawlPageLazada(dataLazada, page, keyword, 1, brands);
    await crawlPageLazada(dataLazada, page, keyword, 2);
    await crawlPageLazada(dataLazada, page, keyword, 3);

    const uniqueBrands = brands.filter((element, index) => {
      return brands.indexOf(element) === index;
    });
    const finalData = uniqueBrands.map(brandName => {
      return {
        brandName: brandName,
        countProductShopee:
          (dataShopee.filter(productName => {
            return productName.search(brandName) > -1;
          }).length /
            60) *
          100,
        countProductLazada:
          (dataLazada.filter(productName => {
            return productName.search(brandName) > -1;
          }).length /
            40) *
          100,
      };
    });
    await browser.close();
    let totalProudctShopee = 0;
    let totalProudctLazada = 0;
    finalData.map(e => {
      totalProudctShopee += e.countProductShopee;
      totalProudctLazada += e.countProductLazada;
      return '';
    });

    const data = [
      ...finalData.filter(el => {
        if (!!el.countProductLazada || !!el.countProductShopee) return true;
        else return false;
      }),
      {
        brandName: 'no brand',
        countProductShopee: ((120 - totalProudctShopee) / 120) * 100,
        countProductLazada: ((120 - totalProudctLazada) / 120) * 100,
      },
    ];
    return data;
  } catch (err) {
    await browser.close();
    console.error(err);
    if (err) throw new HttpException(500, err);
  }
}

class CrawlService {
  public async getData(keyword): Promise<any> {
    if (isEmpty(keyword)) throw new HttpException(400, 'Missing queryParam');
    const queryParamString = encodeURIComponent(keyword);

    const data = await client.get(queryParamString);
    if (isEmpty(data)) {
      const result = await searchKeyword(queryParamString);
      client.setEx(queryParamString, 24 * 60 * 60, JSON.stringify(result)); // unit seconds
      return result;
    } else {
      return JSON.parse(data);
    }
  }
  public async getKeys(): Promise<any> {
    const jobs = client.keys('*');
    return jobs;
  }
  public async clearKeys(): Promise<void> {
    await client.flushAll('ASYNC');
  }
}

export default CrawlService;
