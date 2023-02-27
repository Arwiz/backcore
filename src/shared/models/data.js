const dataTypes = {
    'DATE': 'DATE',
    'INTEGER': 'INTEGER',
    'BOOLEAN':'BOOLEAN' ,
    'SINGLE_SELECT': 'SINGLE_SELECT',
    'MULTI_SELECT': 'MULTI_SELECT',
    'DICT': 'DICT',
    'KEY_VALUE': 'KEY_VALUE',
    'TEXT': 'TEXT',
    'COST': 'COST',
    'FILE': 'FILE',
    'LOG': 'LOG'
};

// 200 OK	The request is OK.
// 201 Created	The request is complete, and a new resource is created .
// 202 Accepted	The request is accepted for processing, but the processing is not complete.
// 203 Non-authoritative Information	The information in the entity header is from a local or third-party copy, not from the original server.
// 204 No Content	A status code and a header are given in the response, but there is no entity-body in the reply.
// 205 Reset Content	The browser should clear the form used for this transaction for additional input.
// 206 Partial Content

export {dataTypes};