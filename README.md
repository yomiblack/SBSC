# AI Chat Widget — Angular + Next.js (NX Monorepo)

This is a fullstack AI-powered chat widget built using **Angular**, **Next.js**, and **NX** in a monorepo architecture. It features a seamless UI, smart message streaming from Hugging Face (used instead of OpenAI due to quota limits), and MongoDB for persistent(just user) chat history, to manage memory.

## 🧠 Features

- 💬 AI chat powered by Hugging Face (streamed response)
- ⚙️ Angular-based chat widget with state management
- 🔁 Live two-way conversation with contextual history
- 🗂 Fullstack NX monorepo: shared code in `libs/`
- 🌐 Deployed on Vercel (single-unit build)
- 🌓 Dark/Light Mode: Automatically adapts to user's system preference

## 🛠 Tech Stack

- **Frontend**: Angular 19 (Tailwind CSS)
- **Backend**: Next.js 15+ API Routes (App Router)
- **AI Model**: Hugging Face (text-generation)
- **Database**: MongoDB via Mongoose
- **Tooling**: NX Workspace, TypeScript, Vercel

## 🏗 Project Structure

angunext/ ├── apps/ │ ├── frontend/ → Angular chat widget │ └── backend/ → Next.js API server ├── libs/ │ └── backend-utils/ → Shared logic (db, CORS, AI)

## 🚀 Deployment

- **Platform**: [Vercel](https://vercel.com/)
- **Build Command**: `nx build backend`
- **Output**: `.next/` (served by Vercel)
- **Root Directory**: `apps/backend`

## 💡 Notes

- OpenAI was replaced with Hugging Face due to usage limits.
- Clean separation of concerns using NX libraries for reusability.
- All features run in a single deployable Vercel app.

---

## 📂 How to Run Locally

```bash
git clone https://github.com/yomiblack/SBSC.git
cd angunext
npm install
npx nx serve frontend  # Angular UI
npx nx dev backend   # Next.js API
```

👨‍💻 Author
Frontend Developer Task — AI Chat Widget
github.com/yomiblack
