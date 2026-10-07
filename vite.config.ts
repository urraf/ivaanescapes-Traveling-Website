import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serves api/chat.ts during `npm run dev` so the AI assistant works locally, same as on Vercel.
function devApi(): Plugin {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const mod = await server.ssrLoadModule('/api/chat.ts')
          const r: Response = await mod.POST(
            new Request('http://localhost/api/chat', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: Buffer.concat(chunks).toString() || '{}',
            }),
          )
          res.statusCode = r.status
          res.setHeader('content-type', 'application/json')
          res.end(await r.text())
        } catch (e) {
          console.error(e)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'dev api failed' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const k of ['GROQ_API_KEY', 'GROQ_MODEL']) if (env[k] && !process.env[k]) process.env[k] = env[k]
  return { plugins: [react(), tailwindcss(), devApi()] }
})
