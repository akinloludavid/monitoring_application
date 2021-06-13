const http = require('http')
const url = require('url')
const server = http.createServer((req,res)=>{
  const parseUrl = url.parse(req.url, true)
  const path = parseUrl.pathname
  if(path ==="/"){
    res.end('Welcome to my API')
  }
  else if(path === '/hello'){
    const hello = "hello"
    const result = JSON.stringify(hello)
    res.setHeader('Content-Type', 'application/json')
    res.end(result)
    
  }else {
    res.end('not found')
  }
})

const port = process.env.PORT || 3500

server.listen(port, ()=>{
  console.log(`Server fired at http://localhost:${port}`)
})