import { CompileJsonPage } from './app.po';

describe('compile-json App', () => {
  let page: CompileJsonPage;

  beforeEach(() => {
    page = new CompileJsonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
