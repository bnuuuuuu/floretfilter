const testText = "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo."

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

const originalReplacer = (text) => {
    return text
        .replace(/fuck/gi, (match) => replaceWithCase(match, "fluff"))
        .replace(/fukc/gi, (match) => replaceWithCase(match, "fluff"))
        .replace(/bullshit/gi, (match) => replaceWithCase(match, "dirt"))
        .replace(/shit/gi, (match) => replaceWithCase(match, "dirt"))
        .replace(/cunt/gi, (match) => replaceWithCase(match, "pal"))
        .replace(/bitches/gi, (match) => replaceWithCase(match, "puppies"))
        .replace(/bitch/gi, (match) => replaceWithCase(match, "puppy"))
        .replace(/faggot/gi, (match) => replaceWithCase(match, "floret"))
        .replace(/fag/gi, (match) => replaceWithCase(match, "flort"))
        .replace(/retard/gi, (match) => replaceWithCase(match, "floret"))
        .replace(/trannies/gi, (match) => replaceWithCase(match, "florets"))
        .replace(/tranny/gi, (match) => replaceWithCase(match, "floret"))
        .replace(/\b(troon)/gi, (match) => replaceWithCase(match, "floret"))
        .replace(/nazism/gi, (match) => replaceWithCase(match, "feralism"))
        .replace(/nazi/gi, (match) => replaceWithCase(match, "feralist"))
        .replace(/capitalis/gi, (match) => replaceWithCase(match, "feralis"))
        .replace(/fascis/gi, (match) => replaceWithCase(match, "feralis"))
        .replace(/porn/gi, (match) => replaceWithCase(match, "florn"))
        .replace(/sex/gi, (match) => replaceWithCase(match, "s*x"))
        .replace(/cock/gi, (match) => replaceWithCase(match, "c*ck"))
        .replace(/dick/gi, (match) => replaceWithCase(match, "d*ck"))
        .replace(/\b(drug)/gi, (match) => replaceWithCase(match, "xenodrug"))
        .replace(/\b(hate)/gi, (match) => replaceWithCase(match, "dislike"))
        .replace(/\b(kill)/gi, (match) => replaceWithCase(match, "end"))
        .replace(/stupid/gi, (match) => replaceWithCase(match, "silly"))
        .replace(/\b(idiots)\b/gi, (match) => replaceWithCase(match, "dummies"))
        .replace(/\b(idiot)\b/gi, (match) => replaceWithCase(match, "dummy"))
        .replace(/\b(died)\b/gi, (match) => replaceWithCase(match, "wilted"))
        .replace(/\b(dies)\b/gi, (match) => replaceWithCase(match, "wilts"))
        .replace(/\b(dying)\b/gi, (match) => replaceWithCase(match, "wilting"))
        .replace(/person/gi, (match) => replaceWithCase(match, "sophont"))
        .replace(/\b(bastard)\b/gi, (match) => replaceWithCase(match, "meanie"))
        .replace(/\b(bastards)\b/gi, (match) => replaceWithCase(match, "meanies"))
        .replace(/\b(die)\b/gi, (match) => replaceWithCase(match, "wilt"));
}

const replaceMapping = [
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
    ["\\b(dies)\\b", "wilts"],
    ["\\b(dying)\\b", "wilting"],
    ["person", "sophont"],
    ["\\b(bastard)\\b", "meanie"],
    ["\\b(bastards)\\b", "meanies"],
    ["\\b(die)\\b", "wilt"],
]

//only supports basic word matching
const replacementBuilder = (mapping) => {
    regex = RegExp(mapping.map(map => map[0]). join('|'), 'gi');
    mapping.forEach(map => map[0] = map[0].replace(/\\b|\(|\)/g, "").trim());
    return (text) => {
        return text.replaceAll(regex, (match) => mapping.find(map => match.trim() == map[0])[1]);
    }
}

builtReplacer = replacementBuilder(replaceMapping);
const newReplacer = (text) => {
    return builtReplacer(text);
}

const runIterations = (method, iter) => {
    const start = Date.now();
    for (let i = 0; i < iter; i++) {
        method();
    }
    return (Date.now() - start) / 1000;
}

const iterations = 100000;
console.log(`Running methods for ${iterations} iterations...`);
console.log(`Original: ${runIterations(() => originalReplacer(testText), iterations)}`);
console.log(`New: ${runIterations(() => newReplacer(testText), iterations)}`);