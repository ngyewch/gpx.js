import t from 'tap';
import { DOMParser, XMLSerializer} from '@xmldom/xmldom';

t.test('parse', t => {
    const parser = new DOMParser();
    const doc = parser.parseFromString('<a>boo</a>', 'text/xml');
    console.log(new XMLSerializer().serializeToString(doc));
    
    t.end();
});
