import { DemoCompileAotPage } from './app.po';

describe('demo-compile-aot App', () => {
  let page: DemoCompileAotPage;

  beforeEach(() => {
    page = new DemoCompileAotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
