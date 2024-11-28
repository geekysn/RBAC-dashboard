import { create } from 'zustand';
import type { Permission, Role, User } from '../types/rbac';

interface RBACStore {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Role) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  addPermission: (permission: Permission) => void;
  updatePermission: (id: string, permission: Partial<Permission>) => void;
  deletePermission: (id: string) => void;
}

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'view_users',
    description: 'View user list and details',
    module: 'Users',
  },
  {
    id: '2',
    name: 'manage_users',
    description: 'Create, update, and delete users',
    module: 'Users',
  },
  {
    id: '3',
    name: 'view_roles',
    description: 'View roles and permissions',
    module: 'Roles',
  },
  {
    id: '4',
    name: 'manage_roles',
    description: 'Create, update, and delete roles',
    module: 'Roles',
  },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: ['1', '2', '3', '4'],
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Manage users only',
    permissions: ['1', '2'],
  },
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    roles: ['1'],
    lastActive: '2024-03-10T10:30:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    roles: ['2'],
    lastActive: '2024-03-09T15:45:00Z',
    status: 'active',
  },
];

export const useRBACStore = create<RBACStore>((set) => ({
  users: mockUsers,
  roles: mockRoles,
  permissions: mockPermissions,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (id, updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      ),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
  addPermission: (permission) =>
    set((state) => ({ permissions: [...state.permissions, permission] })),
  updatePermission: (id, updatedPermission) =>
    set((state) => ({
      permissions: state.permissions.map((permission) =>
        permission.id === id ? { ...permission, ...updatedPermission } : permission
      ),
    })),
  deletePermission: (id) =>
    set((state) => ({
      permissions: state.permissions.filter((permission) => permission.id !== id),
    })),
}));