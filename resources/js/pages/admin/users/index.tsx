import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
  // Include other user properties as needed
  roles: Role[];
}

interface AdminIndexProps {
    users: User[];
}

export default function AdminIndex({ users }: AdminIndexProps) {
    // Stato per la selezione dell'utente
    const [selectedUserId, setSelectedUserId] = useState('');

    // Tronchiamo il testo se è più lungo di 40 caratteri
    // const truncateText = (text: string | null | undefined, length: number = 40) => {
    //     if (!text) return '-';
    //     return text.length > length ? text.substring(0, length) + '...' : text;
    // };

    // Trova l'utente selezionato, convertiamo l'id in stringa e lo confrontiamo con l'id dell'utente selezionato
    const selectedUser = users.find(user => user.id.toString() === selectedUserId);

    // Funzione per gestire la selezione dell'utente, il cui valore è il suo id
    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(e.target.value);
    };

    return (
        <AppLayout>
            <Head title="User Management" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-400">User Management</h1>

                <div className="mb-4">
                    <select
                        id="userSelect"
                        className="border-gray-600 rounded shadow-sm w-full"
                        value={selectedUserId}
                        onChange={handleUserChange}
                    >
                        <option value="" className='text-gray-400' disabled>
                            Select your user
                        </option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id} className='text-black '>
                                {user.name} {user.surname} 
                            </option>
                        ))}
                    </select>
                </div>

                {selectedUser ? (
                    <table className="min-w-full border-3 border-slate-400 shadow-md rounded">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Full Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Phone</th>
                                <th className="py-2 px-4 text-left">Address</th>
                                <th className="py-2 px-4 text-left">Role</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-4">{selectedUser.id}</td>
                                <td className="py-2 px-4">
                                    {selectedUser.name} {selectedUser.surname}
                                </td>
                                <td className="py-2 px-4">{selectedUser.email}</td>
                                <td className="py-2 px-4">{selectedUser.phone}</td>
                                <td className="py-2 px-4">{selectedUser.address}</td>
                                <td className="py-2 px-4">
                                    {selectedUser.roles && selectedUser.roles.length > 0 
                                        ? selectedUser.roles.map((role: Role) => role.name).join(', ') 
                                        : 'No role assigned'}
                                </td>
                                <td className="py-2 px-4">
                                    <Link
                                        href={route('userEditor.edit', selectedUser.id)}
                                        className="text-orange-600 hover:text-indigo-800"
                                    >
                                        EDIT
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 italic">No user selected.</p>
                )}
            </div>
        </AppLayout>
    );
}
