'use strict';
const pug = require('pug')
const fs = require('node:fs')

function handleTopPage(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  const topPage = pug.renderFile('./views/toppage.pug')
  res.end(topPage)
}

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  })
  const favicon = fs.readFileSync('./favicon.ico')
  res.end(favicon)
}

function handleStyleCssFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/css'
  })
  const cssFile = fs.readFileSync('./public/style.css')
  res.end(cssFile)
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-type': 'text/plain; charset=utf-8'
  })
  res.end('ページが見つかりません')
}

module.exports = {
  handleTopPage,
  handleFavicon,
  handleStyleCssFile,
  handleNotFound,
}