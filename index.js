function parseStyle(string) {
    var codes = string.match(/§.{1}/g) || [],
        indices = [],
        apply = [],
        tmpStr,
        indexDelta,
        noCode,
        final = document.createDocumentFragment(),
        len = codes.length,
        string = string.replace(/\n|\\n/g, '<br>');
    
    for (let code of codes) {
        indices.push( string.indexOf(code) );
        string = string.replace(code, '\x00\x00');
    }
    if (indices[0] !== 0) {
        final.appendChild(MinecraftColorCodes.applyCode( string.substring(0, indices[0]), [] ) );
    }
    for (let i = 0; i < codes.length; ++i) {
    	indexDelta = indices[i + 1] - indices[i];
        if(indexDelta === 2) {
            while(indexDelta === 2) {
                apply.push ( codes[i] );
                i++;
                indexDelta = indices[i + 1] - indices[i];
            }
            apply.push ( codes[i] );
        } else {
            apply.push( codes[i] );
        }
        if( apply.lastIndexOf('§r') > -1) {
            apply = apply.slice( apply.lastIndexOf('§r') + 1 );
        }
        tmpStr = string.substring( indices[i], indices[i + 1] );
        final.appendChild(MinecraftColorCodes.applyCode(tmpStr, apply) );
    }
    return final;
}

const MinecraftColorCodes = {
	toHTML: function (text) {
		let d = document.createElement("div");
		d.appendChild(parseStyle(text));
		return d.innerHTML;
	},
	styleMap: {
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
	},
	applyCode: function (string, codes) {
	    let e = document.createElement('span');
	    for (let c of codes)
	        e.style.cssText += MinecraftColorCodes.styleMap[c] + ';';
	    e.innerHTML = string;
	    return e;
	}
}
