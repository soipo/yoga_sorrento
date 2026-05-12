import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Resend lazily to avoid crashing if API key is missing
  let resend: Resend | null = null;
  const getResend = () => {
    if (!resend) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey || apiKey === 're_...') {
        throw new Error('RESEND_API_KEY is not configured. Please add it to your secrets.');
      }
      resend = new Resend(apiKey);
    }
    return resend;
  };

  app.use(express.json());

  // API Route for contact form
  app.post('/api/contact', async (req, res) => {
    const { name, email, offer, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    try {
      const client = getResend();
      const { data, error } = await client.emails.send({
        from: 'Yoga Sorrento <onboarding@resend.dev>', // Resend requires a verified domain or onboarding address
        to: ['info@yogasorrento.it'], // Sending to the user's email
        subject: `New Inquiry for yogasorrento.it from ${name}`,
        html: `
          <h3>New Domain Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Offer:</strong> ${offer || 'No offer provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Resend Error:', error);
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to send email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
