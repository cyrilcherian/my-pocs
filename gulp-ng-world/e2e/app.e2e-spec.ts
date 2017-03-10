import { GulpNgWorldPage } from './app.po';

describe('gulp-ng-world App', () => {
  let page: GulpNgWorldPage;

  beforeEach(() => {
    page = new GulpNgWorldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
