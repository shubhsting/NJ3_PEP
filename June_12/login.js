const puppeteer = require("puppeteer");

const browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximised"],
});
let tab;
browserOpenPromise
  .then((browser) => {
    let pagesPromise = browser.pages();
    return pagesPromise;
  })
  .then((pages) => {
    let page = pages[0];
    tab = page;

    let hackerRankPageOpenPromise = page.goto(
      "https://www.hackerrank.com/auth/login"
    );
    return hackerRankPageOpenPromise;
  })
  .then(() => {
    let emailTypePromise = tab.type("#input-1", "cohotah754@rockdian.com");
    return emailTypePromise;
  })
  .then(() => {
    let passwordTypePromise = tab.type("#input-2", "123456789");
    return passwordTypePromise;
  })
  .then(() => {
    let submitButtonPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return submitButtonPromise;
  })
  .then(() => {
    let waitAndClickPromise = waitAndClick('a[data-attr1="algorithms"]');
    
    return waitAndClickPromise;
  })
  .then(() => {
    let waitPromise = tab.waitForSelector(".challenges-list a", {
      visible: true,
    });
    return waitPromise;
  })
  .then(() => {
    let selectAllProblems = tab.$$(".challenges-list a");
    return selectAllProblems;
  })
  .then((problems) => {
    // [<a></a>, <a></a>, ]
    console.log(problems);

    let problempromise = tab.evaluate((element) => {
      return element.getAttribute("href");
    }, problems[0]);

    //first get link from local promise and then return

    // return (A)
    return Promise.all([problempromise]);
  }) //Promise(A))
  .then((problemLink) => {
    console.log(problemLink);
  });

function waitAndClick(selector) {
  return new Promise((resolve, reject) => {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise
      .then(() => {
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}
