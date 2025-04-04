import { createServer } from 'node:http'
import { createProxy } from 'ai-proxy'


const proxy = createProxy({
  provider: {
    id: 'openai',
    baseURL: 'https://api.openai.com/v1',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  },
  proxy: {
    '/v1/:path*': {
      target: 'openai'
    }
  }
})

createServer(async (req, res) => {
  await proxy.handleNodeRequest(req, res)
}).listen(process.env.PORT || 3000)
