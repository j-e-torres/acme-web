-- TRUNCATE TABLE pages, content;

-- INSERT INTO pages (name, is_home_page) VALUES ('Home', TRUE);
-- INSERT INTO pages (name, is_home_page) VALUES ('Employees', FALSE);
-- INSERT INTO pages (name, is_home_page) VALUES ('Contact', FALSE);

-- -- INSERT INTO posts (userId, title, content, date) VALUES ((SELECT id from users where name='RubeusH'), body
-- INSERT INTO content (name, body) VALUES (
--     (SELECT id from pages where name ='Home'), 
--     '<h1> Welcome to the Home Page </h1>'
--     );

-- INSERT INTO content (name, body) VALUES (
--     (SELECT id from pages where name ='Employees'), 
--     '<h1> Here are our employees </h1>
--         <h1> Moe </h1>
--         <p> Moe is our CEO!!! </p>
--         <h1> Larry </h1>
--         <p> Larry is our CTO!!! </p>
--         <h1> Curly </h1>
--         <p> Curly is our COO!!! </p>
--     '
--     );

-- INSERT INTO content (name, body) VALUES (
--     (SELECT id from pages where name ='Contact'), 
--     '<h1> Here is how you can contact us </h1>
--     <p>Phone Number : 212 355 3443</p>
--     <p>Fax Number: 212 355 3444</p>
--     '
--     );