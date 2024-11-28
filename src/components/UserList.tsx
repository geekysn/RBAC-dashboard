import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Plus } from 'lucide-react';
import { useRBACStore } from '../store/rbacStore';
import type { User } from '../types/rbac';
import { Modal } from './ui/Modal';
import { UserForm } from './forms/UserForm';

export const UserList: React.FC = () => {
  const { users, roles, deleteUser } = useRBACStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const getRoleNames = (roleIds: string[]) => {
    return roleIds
      .map((id) => roles.find((role) => role.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const handleAddNew = () => {
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const UserRow: React.FC<{ user: User }> = ({ user }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="h-8 w-8 lg:h-10 lg:w-10 rounded-full"
            src={user.avatar}
            alt={user.name}
          />
          <div className="ml-3 lg:ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-xs lg:text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{getRoleNames(user.roles)}</div>
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.lastActive).toLocaleDateString()}
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2 lg:space-x-3">
          <button
            onClick={() => handleEdit(user)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="lg:hidden text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
        <h2 className="text-lg font-medium">Users</h2>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full lg:w-auto justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roles
                      </th>
                      <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th scope="col" className="relative px-4 lg:px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};