# RBAC Admin Dashboard

This project is an Admin Dashboard for Role-Based Access Control (RBAC) management. It is built using React, TypeScript, Zustand for state management, and Tailwind CSS for styling. The dashboard allows administrators to manage users, roles, and permissions efficiently.

## Features

- **User Management**: Add, update, and delete users. Assign roles to users.
- **Role Management**: Create, update, and delete roles. Assign permissions to roles.
- **Permission Management**: Define and manage permissions.
- **Theme Toggle**: Switch between light, dark, and system themes.
- **Responsive Design**: Fully responsive design that works on both desktop and mobile devices.


## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/geekysn/RBAC-dashboard.git

```

2. Install Dependencies

```sh
npm install
# or
yarn install
```

3. To Run

```sh
npm run dev
# or
yarn dev
```

4. To Build

```sh
npm run build
# or
yarn build
```

# Project Configuration

## Tailwind CSS  
Tailwind CSS is used for styling.

## Zustand  
Zustand is used for state management. The state is managed in the `src/store` directory.

## TypeScript  
TypeScript is used for type checking.

---

## Components  

### Navbar  
- Responsible for navigation and theme toggle.  

### UserList  
- Displays the list of users.  
- Allows adding, editing, and deleting users.  

### RolesList  
- Displays the list of roles.  
- Allows adding, editing, and deleting roles.  

### PermissionList  
- Displays the list of permissions.  
- Allows adding, editing, and deleting permissions.  

### ThemeToggle  
- Enables switching between light, dark, and system themes.  

### Modal  
- Used for displaying forms and other content in a modal dialog.

---

## State Management  

### Theme Store  
- Manages the theme state (light, dark, system).  
- Persists state using `zustand` and `zustand/middleware`.  

### RBAC Store  
- Manages the state for users, roles, and permissions using `zustand`.  

---

## Acknowledgements  
- [React](https://reactjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Zustand](https://github.com/pmndrs/zustand)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Vite](https://vitejs.dev/)
