import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/layouts/app-layout';

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  roles: Role[];
}

interface DeleteUserProps {
  users: User[];
}

export default function DeleteUser({ users }: DeleteUserProps) {
  // State for the selected user ID
  const [selectedUserId, setSelectedUserId] = useState('');

  // Find the selected user from the list
  const selectedUser = users.find(user => user.id.toString() === selectedUserId);

  // Handle select change
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  // Handle delete action using Inertia.delete
  const handleDelete = () => {
    if (!selectedUser) return;

    if (
      confirm(
        `Are you sure you want to delete ${selectedUser.name} ${selectedUser.surname}? This action cannot be undone.`
      )
    ) {
      Inertia.delete(route('userEditor.destroy', selectedUser.id));
    }
  };

  return (
    <AppLayout>
      <Head title="Delete User" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-400">Delete User</h1>

        <div className="mb-4">
          <select
            id="userSelect"
            className="border-gray-600 rounded shadow-sm w-full"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="" className="text-gray-400" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id} className="text-black">
                {user.name} {user.surname}
              </option>
            ))}
          </select>
        </div>

        {selectedUser ? (
          <div>
            <p className="mb-4">
              You are about to delete{' '}
              <strong>
                {selectedUser.name} {selectedUser.surname}
              </strong>
              . This action cannot be undone.
            </p>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete User
            </button>
          </div>
        ) : (
          <p className="text-gray-500 italic">No user selected.</p>
        )}
      </div>
    </AppLayout>
  );
}
