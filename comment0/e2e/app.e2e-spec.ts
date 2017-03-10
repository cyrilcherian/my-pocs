import { Comment0Page } from './app.po';

describe('comment0 App', () => {
  let page: Comment0Page;

  beforeEach(() => {
    page = new Comment0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
