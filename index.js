const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer((req,res)=>{

  const parseUrl = url.parse(req.url, true)
  
  const path = parseUrl.pathname;
  console.log(path)
  const method = req.method
  const headers = req.headers
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  const queryStringObject = parseUrl.query
  const decoder = new StringDecoder('utf-8')
  let buffer = ""
  req.on('data', (data)=>{
    buffer += decoder.write(data)
  })

  req.on('end', ()=>{
    buffer += decoder.end()
    const chosenHandler = router[trimmedPath] ? router[trimmedPath]: handlers.notFound
    const data = {
      trimmedPath,
      queryStringObject,
      method, 
      headers,
      payload:buffer
    }

    chosenHandler(data, function(statusCode, payload){
      statusCode = typeof(statusCode) == 'number' ? statusCode: 200
      payload = typeof(payload) == 'object' ? payload: {}

      const payloadString = JSON.stringify(payload)
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      console.log(statusCode, payloadString)
    })
    res.end('hello world\n')
  
    console.log('request received on path ', buffer)
  })
})
const port = process.env.PORT || 4500
server.listen(port, ()=>{
  console.log(`Server fired at http://localhost:${port}`)
})
const handlers={}

handlers.hello = function (data, callback){
  callback(406, {name:'hello world'})
}

handlers.notFound = function(data,callback){
  callback(404)
}
const router = {
  hello: handlers.hello
}