import { TopSecretPage } from './app.po';

describe('top-secret App', () => {
  let page: TopSecretPage;

  beforeEach(() => {
    page = new TopSecretPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
