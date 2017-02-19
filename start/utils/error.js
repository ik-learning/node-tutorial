var util = require('util');

var phrases = {
    "Hello": "privet",
    "world": "mir"
};

function PhraseError(message) {
    this.message = message;
    Error.captureStackTrace(this, PhraseError);
}

util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttError);
}

util.inherits(HttError, Error);
HttError.prototype.name = 'HttpError';

function getPhrase(name) {
    if (!phrases[name]) {
        throw new PhraseError('Phrase not found: ' + name);
    }
    return phrases[name];
}

function makePage(url) {
    if (url != 'index.html') {
        throw new HttError(404, 'Page not found');
    }
    return util.format("%s %s!", getPhrase("Hel2lo"), getPhrase("world"));
}
try {
    var page = makePage('index.html');
    console.log(page);
} catch (e) {
    if (e instanceof HttError) {
        console.log(e.status, e.message);
    } else {
        console.error('Error %s\n meesage: %s\n stek %s',
        e.name, e.message, e.stack)
    }
}

