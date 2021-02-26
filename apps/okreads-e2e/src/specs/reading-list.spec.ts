import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  xit('Then: I should undo book from my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('java');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');

    const bookList = await $('[data-testing="add-book"]');
    // await bookList[1].click();
    //
    // await browser.wait(
    //   ExpectedConditions.textToBePresentInElement(
    //     $('[data-testing="reading-list-container"]'),
    //     'My Reading List'
    //   )
    // );
  });
});
