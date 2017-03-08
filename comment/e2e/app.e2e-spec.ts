import { CommentPage } from './app.po';

describe('comment App', function() {
  let page: CommentPage;

  beforeEach(() => {
    page = new CommentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
