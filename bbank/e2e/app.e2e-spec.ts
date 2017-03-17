import { BbankPage } from './app.po';

describe('bbank App', () => {
  let page: BbankPage;

  beforeEach(() => {
    page = new BbankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
