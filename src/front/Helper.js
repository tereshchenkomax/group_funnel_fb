/**
 * Helper class contain all helper functions
 */
;var Helper = {
    /**
     * Parse string to JSON
     *
     * @param str
     */
    parseToJson: function (str) {
        return JSON.parse(str.replace(/\\u002d/g, "-"));
    },

    /**
     * Returns full name
     * @param base
     * @param url
     * @returns {*}
     */
    getFullUrl: function (base, url) {
        return /^https?:\/\//i.test(url) ? url : base + url.replace(/^\/+/, "");
    },

    checkValidHeadline: function(str) {
        var valid = true;
        var re = new RegExp('^[\\W]+$', 'giu');
        if(str.match(re) != null){
            valid = false;
        }
        return valid;
    },

    getCompanyName: function(str) {

        var companyName;

        var companyNameWithAt = str.lastIndexOf(" at ");

        if(companyNameWithAt != -1){
           companyName = str.substring(companyNameWithAt+3,str.length)
        }

        var companyNameWithDog = str.lastIndexOf(" @ ");

        if(companyNameWithDog != -1 ){
            companyName = str.substring(companyNameWithDog+2,str.length);
        }

        var companyNameDeutsch = str.lastIndexOf(" bei ");

        if(companyNameDeutsch != -1 ){
            companyName = str.substring(companyNameDeutsch+4,str.length);
        }

        var companyNameFrench = str.lastIndexOf(" chez ");

        if(companyNameFrench != -1 ){
            companyName = str.substring(companyNameFrench+5,str.length);
        }

        var companyNameSweeden = str.lastIndexOf(" på ");

        if(companyNameSweeden != -1 ){
            companyName = str.substring(companyNameSweeden+3,str.length);
        }

        var companyNameDanish = str.lastIndexOf(" hos ");

        if(companyNameDanish != -1 ){
            companyName = str.substring(companyNameDanish+4,str.length);
        }

        return companyName;
    },

    getUrlVars: function (url) {
        var vars = [], hash;
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    getElementByXpath: function (path, domDocument) {
        return document.evaluate(path, domDocument, null, XPathResult.ANY_TYPE, null);
    },
    
    clearName: function (name) {
        if (name) {
            name = name.replace(/<\/?b>/ig, "");
        }

        name = $('<textarea />').html(name).text();

        return name;
    },

    getNodeComment: function(el) {
        if(el) {
            for(var i = 0; i < el.childNodes.length; i++) {
                var node = el.childNodes[i];
                if(node.nodeType === 8) {
                    return node.nodeValue;
                }
            }
        }

        return false;
    },

    isEmpty: function(value) {
        return (value === undefined || value == null || value.length <= 0) ? true : false;
    }
};
