import { TopSecretPage } from './app.po';

describe('hello-weed App', () => {
  let page: TopSecretPage;

  beforeEach(() => {
    page = new TopSecretPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
