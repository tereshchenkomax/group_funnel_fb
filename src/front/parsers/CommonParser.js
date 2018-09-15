class CommonParser {
  getElementsByXPath(xpath, dom) {
    let results = [];
    let query = document.evaluate(xpath,
        dom,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    for (let i=0, length=query.snapshotLength; i<length; ++i) {
      results.push(query.snapshotItem(i));
    }
    return results;
  }
  getElementByXPath(xpath, dom) {
      return document.evaluate(xpath, dom, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  getHTMLFromString(str) {
      const parser = new DOMParser;
      return parser.parseFromString(str, 'text/html')
  }
  getListInfo(){
    let totalCount = document.evaluate("normalize-space(//*[contains(@class, 'search-results__title-and-total')]//*[contains(@class, 'results__total')]/text())", document, null, XPathResult.STRING_TYPE, null).stringValue;
    totalCount = totalCount.replace(/[^0-9,]/g, '');
    const linkButtons = this.getElementsByXPath("//*[contains(@class,'results-paginator')]/li[contains(@class, 'page-list')]//button",document);

    return {
      totalCount: totalCount,
      linkButtons: linkButtons
    }
  }
  setScrollToList(id){
    const list = document.getElementById(id);
    window.scrollTo(0, list.getBoundingClientRect().top);
  }
}