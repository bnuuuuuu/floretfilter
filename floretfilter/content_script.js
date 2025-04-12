const replaceMappingSwear = [
    ["fuck", "fluff"],
    ["fukc", "fluff"],
    ["bullshit", "dirt"],
    ["shit", "dirt"],
    ["cunt", "pal"],
    ["bitches", "puppies"],
    ["bitch", "puppy"],
    ["faggot", "floret"],
    ["fag", "flort"],
    ["retard", "floret"],
    ["trannies", "florets"],
    ["tranny", "floret"],
    ["\\b(troon)", "floret"],
];
const replaceMappingFull = [
    ["nazism", "feralism"],
    ["nazi", "feralist"],
    ["capitalis", "feralis"],
    ["fascis", "feralis"],
    ["porn", "florn"],
    ["sex", "s*x"],
    ["cock", "c*ck"],
    ["dick", "d*ck"],
    ["\\b(drug)", "xenodrug"],
    ["\\b(hate)", "dislike"],
    ["\\b(kill)", "end"],
    ["stupid", "silly"],
    ["\\b(idiots)\\b", "dummies"],
    ["\\b(idiot)\\b", "dummy"],
    ["\\b(died)\\b", "wilted"],
    ["\\b(dead)\\b", "wilted"],
    ["\\b(dies)\\b", "wilts"],
    ["\\b(dying)\\b", "wilting"],
    ["person", "sophont"],
    ["\\b(bastard)\\b", "meanie"],
    ["\\b(bastards)\\b", "meanies"],
    ["\\b(die)\\b", "wilt"],
];

const replacementBuilder = (mapping) => {
    //if the mapping is empty, return a dummy method
    if (mapping.length === 0) {
        return (text) => ({
            text, changed: false
        });
    }
    //clone mapping array to avoid modifying the base ones
    mapping = JSON.parse(JSON.stringify(mapping));

    regex = RegExp(mapping.map(map => map[0]). join('|'), 'gi');
    mapping.forEach(map => map[0] = map[0].replace(/\\b|\(|\)/g, "").trim());
    return (text) => {
        let changed = false;
        const replacedText = text.replaceAll(
            regex,
            (match) => {
                changed = true;
                return replaceWithCase(match, mapping.find(map => match.trim().toLowerCase() == map[0])[1]);
            },
        );
        return { text: replacedText, changed }
    }
}

let replacer;

const updateReplacer = (filters) => {
    let mapping = [];
    if (filters.swear || filters.full) {
        mapping = [...replaceMappingSwear];
    }
    if (filters.full) {
        mapping = [...mapping, ...replaceMappingFull];
    }
    replacer = replacementBuilder(mapping);
}

// Function to match and replace word while preserving case
const replaceWithCase = (word, replacement) => {
    return word.replace(/(\b\w+\b)/gi, (match) => {
        if (match === match.toUpperCase()) {
            return replacement.toUpperCase();
        } else if (match === match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
        }
        return replacement.toLowerCase();
    });
};

const replaceTextNode = (node) => {
    if (node.nodeType === 3) { // Text node
        const text = node.nodeValue;
        const replacement = replacer(text);
        if (replacement.changed) {
            node.nodeValue = replacement.text;
        }
    }
}

const replaceFullText = () => {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                // Ignore text nodes in certain elements like links and buttons
                const parent = node.parentNode;
                if (parent && (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SCRIPT'].includes(parent.tagName) || parent.isContentEditable)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    let currentNode;
    while (currentNode = walker.nextNode()) {
        replaceTextNode(currentNode);
    }
}


// Start Execution
chrome.storage.sync.get(['filters'], (data) => {
    updateReplacer(data.filters || {});
    setInterval(() => {
        replaceFullText();
    }, 500);
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.filters && changes.filters.newValue) {
        updateReplacer(changes.filters.newValue);
    }
});