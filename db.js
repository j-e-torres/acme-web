const pg = require('pg');
const client = new pg.Client('postgres://localhost/acmeweb')

client.connect();

const getPages = () => {
    return client.query('SELECT pages.*, content.body from pages JOIN content ON content.page_id = pages.id ')
        .then(response => response.rows);
}

const getPage = (id) => {
    return client.query('SELECT pages.*, content.body from pages JOIN content ON content.page_id = pages.id WHERE content.page_id=$1', [ id ])
        .then(response => response.rows[0])
}

const sync = () => {
    return client.query(SEED);
}

const SEED = `
    DROP TABLE IF EXISTS content;
    DROP TABLE IF EXISTS pages;
    CREATE TABLE pages (
        id SERIAL PRIMARY KEY,
        name varchar(100),
        is_home_page boolean
    );

    CREATE TABLE content(
        id SERIAL PRIMARY KEY,
        name varchar(100),
        body varchar(255),
        page_id integer references pages(id)
    );

    INSERT INTO pages(name, is_home_page) VALUES ('Home', TRUE);
    INSERT INTO pages(name, is_home_page) VALUES ('Employees', FALSE);
    INSERT INTO pages(name, is_home_page) VALUES ('Contact', FALSE);

    INSERT INTO content (page_id, body) VALUES (
        (SELECT id from pages where name ='Home'), 
        '<h2> Welcome to the Home Page </h2>
        <div> So looking forward to having you browse our site </div>
        '
        );
    
    INSERT INTO content (page_id, body) VALUES (
        (SELECT id from pages where name ='Employees'), 
        '
            <h2> Moe </h2>
            <div> Moe is our CEO!!! </div>
            <h2> Larry </h2>
            <div> Larry is our CTO!!! </div>
            <h2> Curly </h2>
            <div> Curly is our COO!!! </div>
        '
        );
    
    INSERT INTO content (page_id, body) VALUES (
        (SELECT id from pages where name ='Contact'), 
        '<h2> Phone Number </h2>
        <div> Please call us at 212-555-1212 </div>
        <h2> Fax Number </h2>
        <div> Or fax us at 212-555-1212 </div>
        '
        );
`;

module.exports = {
    getPages,
    getPage,
    sync
}
