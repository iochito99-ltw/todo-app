'use strict';
const pug = require('pug')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function handleList(req, res) {
  const tasks = await prisma.todo.findMany({
    orderBy: { id: 'desc' }
  })

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  const html = pug.renderFile('./views/list.pug', { tasks })
  res.end(html)
}

function handleNewPage(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  const newPage = pug.renderFile('./views/new.pug')
  res.end(newPage)
}

async function handleCreate(req, res) {
  let body = ''
  req.on('data', chunk => body += chunk)

  req.on('end', async () => {
    const params = new URLSearchParams(body)
    const title = params.get('title')

    if (!title) {
      res.writeHead(303, {'Location': '/todo/new'})
      res.end()
      return
    }

    await prisma.todo.create({
      data: {
        title,
        done: false
      }
    })
    res.writeHead(303, { Location: '/todo' })
    res.end()
  })
}

async function handleToggle(req, res) {
  let body = ''
  req.on('data', chunk => body += chunk)

  req.on('end', async () => {
    const params = new URLSearchParams(body)
    const id = Number(params.get('id'))

    const task = await prisma.todo.findUnique({
      where: { id }
    })

    await prisma.todo.update({
      where: { id },
      data: { done: !task.done }
    })

    res.writeHead(303, { Location: '/todo' })
    res.end()
  })
}

async function handleDelete(req, res) {
  let body = ''
  req.on('data', chunk => body += chunk)

  req.on('end', async () => {
    const params = new URLSearchParams(body)
    const id = Number(params.get('id'))

    await prisma.todo.delete({
      where: { id },
    })

    res.writeHead(303, { Location: '/todo' })
    res.end()
  })
}

module.exports = {
  handleList,
  handleNewPage,
  handleCreate,
  handleToggle,
  handleDelete,
}