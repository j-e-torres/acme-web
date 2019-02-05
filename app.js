const express = require('express');
const db = require('./db');
const app = express();
module.exports = app;

const renderPage = (page, pages) => {
return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Acme: Home</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        </head>
        <body>

        <div class='container'>
            <h1>Acme Web</h1>
            
            <ul class='nav nav-tabs style='margin-bottom: 20px'>
                ${ pages.map (page => {
                    return `
                        <li class='nav-item' style='padding: 10px'>
                            <a href='/pages/${page.id}' class='nav link'>
                                ${ page.name }
                            </a>
                        </li>
                    `;
                }).join('')
                }
            </ul>
                ${ page.body }

        </div>
        </body>
    </html>
`;
}

app.use((req, res, next) => {
    db.getPages()
        .then( pages => {
            req.pages = pages;
            next();
        })
        .catch(next);
})

app.get('/', (req, res, next) => {
    const page = req.pages[0];
    res.redirect(`/pages/${page.id}`);
})

app.get('/pages/:id', (req, res, next) => {
    db.getPage(req.params.id)
        .then( page => res.send(renderPage(page, req.pages)))
        .catch(next);
})
