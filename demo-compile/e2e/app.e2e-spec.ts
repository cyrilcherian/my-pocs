import { DemoCompilePage } from './app.po';

describe('demo-compile App', function() {
  let page: DemoCompilePage;

  beforeEach(() => {
    page = new DemoCompilePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
