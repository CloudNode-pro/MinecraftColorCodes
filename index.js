var obfuscators = [];
var styleMap = {
    '§4': 'font-weight:normal;text-decoration:none;color:#ec0505',
    '§c': 'font-weight:normal;text-decoration:none;color:#ff495a',
    '§6': 'font-weight:normal;text-decoration:none;color:#ff9800',
    '§e': 'font-weight:normal;text-decoration:none;color:#ffeb3b',
    '§2': 'font-weight:normal;text-decoration:none;color:#4caf50',
    '§a': 'font-weight:normal;text-decoration:none;color:#50ff57',
    '§b': 'font-weight:normal;text-decoration:none;color:#0dcaf0',
    '§3': 'font-weight:normal;text-decoration:none;color:#20c997',
    '§1': 'font-weight:normal;text-decoration:none;color:#0d6efd',
    '§9': 'font-weight:normal;text-decoration:none;color:#7070e6',
    '§d': 'font-weight:normal;text-decoration:none;color:#e8559e',
    '§5': 'font-weight:normal;text-decoration:none;color:#7c10f2',
    '§f': 'font-weight:normal;text-decoration:none;color:#ffffff',
    '§7': 'font-weight:normal;text-decoration:none;color:#bfbfbf',
    '§8': 'font-weight:normal;text-decoration:none;color:#6c757d',
    '§0': 'font-weight:normal;text-decoration:none;color:#343a40',
    '§l': 'font-weight:bold',
    '§n': 'text-decoration:underline;text-decoration-skip:spaces',
    '§o': 'font-style:italic',
    '§m': 'text-decoration:line-through;text-decoration-skip:spaces',
};
function obfuscate(string, elem) {
    var magicSpan,
        currNode,
        len = elem.childNodes.length;
    if(string.indexOf('<br>') > -1) {
        elem.innerHTML = string;
        for(var j = 0; j < len; j++) {
            currNode = elem.childNodes[j];
            if(currNode.nodeType === 3) {
                magicSpan = document.createElement('span');
                magicSpan.innerHTML = currNode.nodeValue;
                elem.replaceChild(magicSpan, currNode);
                init(magicSpan);
            }
        }
    } else {
        init(elem, string);
    }
    function init(el, str) {
        var i = 0,
            obsStr = str || el.innerHTML,
            len = obsStr.length;
        obfuscators.push( window.setInterval(function () {
            if(i >= len) i = 0;
            obsStr = replaceRand(obsStr, i);
            el.innerHTML = obsStr;
            i++;
        }, 0) );
    }
    function randInt(min, max) {
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    }
    function replaceRand(string, i) {
        var randChar = String.fromCharCode( randInt(64,90) ); /*Numbers: 48-57 Al:64-90*/
        return string.substr(0, i) + randChar + string.substr(i + 1, string.length);
    }
}
function applyCode(string, codes) {
    var len = codes.length;
    var elem = document.createElement('span'),
        obfuscated = false;
    for(var i = 0; i < len; i++) {
        elem.style.cssText += styleMap[codes[i]] + ';';
        if(codes[i] === '§k') {
            obfuscate(string, elem);
            obfuscated = true;
        }
    }
    if(!obfuscated) elem.innerHTML = string;
    return elem;
}
function parseStyle(string) {
    var codes = string.match(/§.{1}/g) || [],
        indexes = [],
        apply = [],
        tmpStr,
        indexDelta,
        noCode,
        final = document.createDocumentFragment(),
        len = codes.length,
        string = string.replace(/\n|\\n/g, '<br>');
    
    for(var i = 0; i < len; i++) {
        indexes.push( string.indexOf(codes[i]) );
        string = string.replace(codes[i], '\x00\x00');
    }
    if(indexes[0] !== 0) {
        final.appendChild( applyCode( string.substring(0, indexes[0]), [] ) );
    }
    for(var i = 0; i < len; i++) {
    	indexDelta = indexes[i + 1] - indexes[i];
        if(indexDelta === 2) {
            while(indexDelta === 2) {
                apply.push ( codes[i] );
                i++;
                indexDelta = indexes[i + 1] - indexes[i];
            }
            apply.push ( codes[i] );
        } else {
            apply.push( codes[i] );
        }
        if( apply.lastIndexOf('§r') > -1) {
            apply = apply.slice( apply.lastIndexOf('§r') + 1 );
        }
        tmpStr = string.substring( indexes[i], indexes[i + 1] );
        final.appendChild( applyCode(tmpStr, apply) );
    }
    return final;
}
function clearObfuscators() {
    var i = obfuscators.length;
    for(;i--;) {
        clearInterval(obfuscators[i]);
    }
    obfuscators = [];
}

const MinecraftColorCodes = {
	toHTML: function (text) {
		let d = document.createElement("div");
		d.appendChild(parseStyle(text));
		return d.innerHTML;
	}
}
