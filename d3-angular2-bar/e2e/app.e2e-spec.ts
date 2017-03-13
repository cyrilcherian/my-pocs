import { D3Angular2BarPage } from './app.po';

describe('d3-angular2-bar App', () => {
  let page: D3Angular2BarPage;

  beforeEach(() => {
    page = new D3Angular2BarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
