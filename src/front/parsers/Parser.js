class Parser extends CommonParser{
    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {
          currUrl: null,
          groupName: null,
          contacts:{}
        };
    }

    runParse(path) {

        this.state.currUrl = path;
        this.state.groupName = document.evaluate("normalize-space(//*[contains(@id, 'mainContainer')]//a[contains(@href, 'groups')]/text())", document, null, XPathResult.STRING_TYPE, null).stringValue;
        //return this.getList(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]", document)
        return this.getList(".//*[contains(@id, 'member_requests_pagelet')]//div/div/ul[contains(@class, 'uiList')]/li[not(@class)]/div[contains(@direction, 'left') or contains(@direction, 'right')]/div/div/div/div[last()]/ul/li[not(i)]/ancestor::li[not(@class)]/div", document)
    }

    getList(xPath) {
      return new Promise((resolve, reject) => {
        let entities = this.getElementsByXPath(xPath, document);
        let result = [];
        entities.forEach((entity, idx, array) => {
          this.parseProfile({htmlString:entity.innerHTML})
            .then(record => { return result.push(record) })
            .catch(err => { return reject(err); });
        });
        resolve(result);
    });
  }

  parseProfile({ htmlString }) {
    return new Promise((resolve, reject) => {
      try {
        let record = new Record,
            dom = this.getHTMLFromString(htmlString),
            showMoreExist = false;

        console.log('dom', dom);

        const name = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/text())", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setName(name);

        record.setGroupName(this.state.groupName)

        const groupId = this.state.currUrl.match(/groups\/(\w+)(\/|$)/);

        record.setGroup(groupId[1])

        const userId = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/@uid)", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setUserId(userId)

        const profileUrl = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/@href)", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setProfileUrl('https://www.facebook.com'+profileUrl)

        const avatarImage = document.evaluate("normalize-space(//a[contains(@data-hovercard, '/ajax/hovercard/user')]/img/@src)", dom, null, XPathResult.STRING_TYPE, null).stringValue;

        record.setAvatarImage(avatarImage)

        const answersRaw = this.getElementsByXPath(".//body/div/div/div/div[last()]/ul/li[not(i)]", dom);

        let answers = [];

        answersRaw.forEach((i, idx, array) => {
            let answerDom = this.getHTMLFromString(i.innerHTML),
                resAnswer = new answerRecord;
            const question = document.evaluate("normalize-space(//div/text())", answerDom, null, XPathResult.STRING_TYPE, null).stringValue;
            resAnswer.setQuestion(question);
            const answer = document.evaluate("normalize-space(//text/text())", answerDom, null, XPathResult.STRING_TYPE, null).stringValue;
            resAnswer.setAnswer(answer);
            answers.push(resAnswer.toObject());
        });

        record.setAnswers(answers);

        resolve(record.toObject());
      } catch(err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
