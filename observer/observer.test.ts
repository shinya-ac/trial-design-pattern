import { NewsService, ConcreteSubscriber } from './observer';

describe('observer pattern test', () => {
    let newsService: NewsService;
    let subscriber1: ConcreteSubscriber;
    let subscriber2: ConcreteSubscriber;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        newsService = new NewsService();
        subscriber1 = new ConcreteSubscriber("ジョン");
        subscriber2 = new ConcreteSubscriber("リンゴスター");
        consoleSpy = jest.spyOn(console, 'log');
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('should output news', () => {
        newsService.subscribe(subscriber1);
        newsService.subscribe(subscriber2);

        const newsContent = "速報: 月面着陸成功！"
        newsService.addNews(newsContent);

        expect(consoleSpy).toHaveBeenCalledWith(`NewsService: 新しいニュースが追加されました - ${newsContent}`);
        expect(consoleSpy).toHaveBeenCalledWith(`${subscriber1.name}はニュースを受け取りました: ${newsContent}`);
        expect(consoleSpy).toHaveBeenCalledWith(`${subscriber2.name}はニュースを受け取りました: ${newsContent}`);
    });

    it('should not notify unsubscribed subscribers', () => {
        newsService.subscribe(subscriber1);
        newsService.subscribe(subscriber2);
        newsService.unsubscribe(subscriber2);
    
        const newsContent = "速報: 火星に着陸成功！"
        newsService.addNews(newsContent);
    
        expect(consoleSpy).toHaveBeenCalledWith(`NewsService: 新しいニュースが追加されました - ${newsContent}`);
        expect(consoleSpy).toHaveBeenCalledWith(`${subscriber1.name}はニュースを受け取りました: ${newsContent}`);
        expect(consoleSpy).not.toHaveBeenCalledWith(`${subscriber2.name}はニュースを受け取りました: ${newsContent}`);
      });
});
