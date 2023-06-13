const puppeteer = require("puppeteer");

const browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximised"],
});
let tab;
let idx;
let codeContent;

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
    let completeProblemLink = "https://www.hackerrank.com/" + problemLink;
    let solveQuestionPromise = solveQuestion(completeProblemLink);
    return solveQuestionPromise;
  });

function solveQuestion(link) {
  return new Promise((resolve, reject) => {
    let questionGoToPromise = tab.goto(link);
    questionGoToPromise
      .then(() => {
        console.log("question opened!!");
        let waitAndOpenpromise = waitAndClick('a[data-attr2="Submissions"]');
        return waitAndOpenpromise;
      })
      .then(() => {
        let waitAndClickPromise = waitAndClick('a[data-attr2="Editorial"]');
        return waitAndClickPromise;
      })
      .then(() => {
        let getQuestionCodePromise = getCode();
        return getQuestionCodePromise;
      })
      .then(() => {
        const waitAndClickPromise = waitAndClick("#tab-1-item-0");
        return waitAndClickPromise;
      })
      .then(() => {
        let pasteCodePromise = pasteCode();
        return pasteCodePromise;
      }).then(()=>{
        let submitButtonPressPromise = tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.hr-monaco-submit")
        return submitButtonPressPromise;
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function pasteCode() {
  return new Promise((resolve, reject) => {
    let clickCheckBoxPromise = waitAndClick(".checkbox-input");
    clickCheckBoxPromise
      .then(() => {
        let codeTypePromise = tab.type(".custom-input", codeContent);
        return codeTypePromise;
      })
      .then(() => {
        //select all > ctrl+a
        //cut ctrl + x
        let ctrlKeyPressPromise = tab.keyboard.down("Control");
        return ctrlKeyPressPromise;
      })
      .then(() => {
        let akeyPressPromise = tab.keyboard.press("a");
        console.log("pressed a ")
        return akeyPressPromise;
      })
      .then(() => {
        let xkeyPressPromise = tab.keyboard.press("x");
        return xkeyPressPromise;
      }).then(()=>{
        let makeCodeInputActive = tab.click(".monaco-editor.no-user-select.vs")
        return makeCodeInputActive;
      }).then(() => {
        let akeyPressPromise = tab.keyboard.press("a");
        return akeyPressPromise;
      })
      .then(() => {
        let vkeyPressPromise = tab.keyboard.press("v");
        return vkeyPressPromise;
      }).then(()=>{
        resolve()
      })
  });
}
function getCode() {
  return new Promise((resolve, reject) => {
    let waitForH3 = tab.waitForSelector(".hackdown-content h3");
    waitForH3
      .then(() => {
        let allCodeNamesPromise = tab.$$(".hackdown-content h3");
        return allCodeNamesPromise;
      })
      .then((allCodeNames) => {
        // [<h3>C++</h3>, <h3>Java</h3>]
        let allCodeNamesP = [];
        for (const codeName of allCodeNames) {
          let namePromise = tab.evaluate((elem) => {
            return elem.textContent;
          }, codeName);
          allCodeNamesP.push(namePromise);
        }
        return Promise.all(allCodeNamesP);
      })
      .then((allCodeNames) => {
        for (let i = 0; i < allCodeNames.length; i++) {
          if (allCodeNames[i] == "C++") {
            idx = i;
            break;
          }
        }
        const codeContentsPromise = tab.$$(".hackdown-content .highlight");
        return codeContentsPromise;
      })
      .then((codeContents) => {
        // [<div></div>, <div></div>]
        let codeContentDiv = codeContents[idx];
        let codePromise = tab.evaluate((elem) => {
          return elem.textContent;
        }, codeContentDiv);
        return codePromise;
      })
      .then((code) => {
        codeContent = code;
        resolve(code);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

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
