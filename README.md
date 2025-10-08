# 📝 Task Management System (React + Supabase + Zustand)

A modern **Kanban-style Task Management System** built using **React**, **Zustand**, **Supabase**, and **Tailwind CSS**, featuring **authentication**, **CRUD operations**, and **drag-and-drop task management**.

---

## 🚀 Tech Stack

<p align="left">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="40" height="40" alt="React" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/reactrouter/reactrouter-original.svg" width="40" height="40" alt="React Router" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/zustand/zustand-original.svg" width="40" height="40" alt="Zustand" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" width="40" height="40" alt="Supabase" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40" alt="TailwindCSS" />
</p>

---

## ⚙️ Core Features

### 🔐 Authentication

- Login & logout functionality using **Supabase Auth**
- Secure session handling via Supabase
- Redirects based on auth state

### 📋 Task Management (CRUD)

- ➕ **Add Task** — create new tasks with title & description
- ✏️ **Edit Task** — update task details in real-time
- 🗑️ **Delete Task** — remove tasks instantly
- 📡 **Fetch Tasks** — auto-refresh task board after CRUD actions

### 🧱 Kanban Board with Drag & Drop

- Built using **@hello-pangea/dnd**
- Move tasks between:
  - 🟩 **To-Do**
  - 🟦 **In Progress**
  - ⚪ **Done**
- Auto-updates database on drop (via Supabase + Zustand action)

### 🧠 Global State Management

- Managed with **Zustand**
- Store includes:
  - `fetchAllTasks`
  - `addTask`
  - `updateTask`
  - `deleteTask`
  - `updateTasksByDragging`

### 🎨 Modern UI

- Styled using **Tailwind CSS**
- Responsive grid-based Kanban layout
- Clean modals and buttons

---

## 🛠️ Project Structure

```
src/
│
├── components/
│   ├── AddTaskModal.jsx
│   ├── TaskBoard/
│   │   ├── TaskList.jsx
│   │   └── TaskCard.jsx
│
├── stores/
│   └── task.js   # Zustand store for task state
│
├── pages/
│   ├── LoginForm.jsx
│   ├── Dashboard.jsx
│
├── utils/
│   └── supabase.js  # Supabase client & helper functions
│
└── App.jsx          # Routes setup using React Router
```

---

## 🧩 Zustand Store Example

```js
import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,

  fetchAllTasks: async () => {
    set({ loading: true });
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });
    set({ tasks: data, loading: false });
  },

  addTask: async (task) => {
    await supabase.from("tasks").insert([task]);
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  deleteTask: async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  updateTasksByDragging: async (id, status) => {
    if (!status) return;
    await supabase.from("tasks").update({ status }).eq("id", id);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
  },
}));
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/task-board.git
cd task-board
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

Create a `.env` file:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Then visit 👉 **http://localhost:5173**

---

## 🧭 Routing (React Router)

---

## 📦 Dependencies

| Package             | Purpose           |
| ------------------- | ----------------- |
| `react`             | UI library        |
| `react-router-dom`  | Routing system    |
| `zustand`           | State management  |
| `@hello-pangea/dnd` | Drag and drop     |
| `supabase-js`       | Backend & auth    |
| `tailwindcss`       | Styling framework |

---

## 🧠 Learning Highlights

- Implemented **Supabase authentication**
- Used **Zustand** for state management (lightweight Redux alternative)
- Created **responsive Kanban board** with DnD
- Managed **reactive UI** with async Supabase operations

---

## 📸 Preview

_(Optional: Add screenshots or GIFs here)_

```
[ AddTaskModal ] → Task created
[ Drag between columns ] → Status auto-updates
[ Supabase dashboard ] → Live sync
```

---

## 🧑‍💻 Author

**Jeremy**  
Built with ❤️ using React, Zustand, Tailwind, and Supabase.
