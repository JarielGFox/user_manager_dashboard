# Laravel + Inertia.js User Management Dashboard

A modern admin panel for managing users, built with **Laravel 12**, **Inertia.js**, and **React**.

## ✨ Features

- 🧑 View and edit user information
- 🔐 Role-based access (Admin & up can delete users)
- 🔄 Assign roles using a dropdown UI
- 📂 Soft-deletable users (if using SoftDeletes)
- ⚙️ Roles managed through a central Laravel `config/roles.php` file
- ✅ TypeScript support with clean React components
- 🎨 TailwindCSS-based layout and styling

## 📁 Tech Stack

- Laravel 12 (Backend)
- Inertia.js
- React + TypeScript (Frontend)
- TailwindCSS
- Ziggy (for Laravel route usage in JS)

## 🚀 Getting Started

Clone the repo and install dependencies:

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
composer install
npm install
cp .env.example .env
php artisan key:generate
```