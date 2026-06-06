'use strict';
const util = require('./handler-util')
const todoHandler = require('./todo-handler')

function route(req, res) {
  const url = req.url
  const method = req.method

  if (url === "/favicon.ico") {
    util.handleFavicon(req, res)
    return
  }
  if (url === "/" && method === 'GET') {
    util.handleTopPage(req, res)
    return
  }
  if (url === "/todo" && method === 'GET') {
    todoHandler.handleList(req, res)
    return
  }
  if (url === "/todo/new" && method === 'GET') {
    todoHandler.handleNewPage(req, res)
    return
  }
  if (url === "/todo/new" && method === 'POST') {
    todoHandler.handleCreate(req, res)
    return
  }
  if (url === "/todo/toggle" && method === 'POST') {
    todoHandler.handleToggle(req, res)
    return
  }
  if (url === "/todo/delete" && method === 'POST') {
    todoHandler.handleDelete(req, res)
    return
  }
  if (url === "/style.css") {
    util.handleStyleCssFile(req, res)
    return
  }
  util.handleNotFound(req, res)
}

module.exports = {
  route,
}