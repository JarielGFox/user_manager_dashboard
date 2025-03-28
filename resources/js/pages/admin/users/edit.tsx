import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type User } from '@/types';

interface Role {
  id: number;
  name: string;
}
interface AdminEditProps {
  user: User;
  roles: Role[];
}

export default function AdminEdit({ user, roles }: AdminEditProps) {
  // Initialize the form with the current user data
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    surname: user.surname,
    date_of_birth: user.date_of_birth,
    username: user.username,
    avatar: user.avatar,
    email: user.email,
    phone: user.phone,
    address: user.address,
    biography: user.biography,
    role: user.role,
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('userEditor.update', { user: user.id }));
  };

  return (
    <AppLayout>
      <Head title="Edit User" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-400">Manage User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="surname" className="block font-semibold">Surname</label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={data.surname}
              onChange={(e) => setData('surname', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.surname && <div className="text-red-500 text-sm">{errors.surname}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.surname && <div className="text-red-500 text-sm">{errors.surname}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block font-semibold">Avatar</label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              value={data.avatar || ''}
              onChange={(e) => setData('avatar', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.avatar && <div className="text-red-500 text-sm">{errors.avatar}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={data.phone || ''}
              onChange={(e) => setData('phone', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-semibold">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={data.address || ''}
              onChange={(e) => setData('address', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="biography" className="block font-semibold">Biography</label>
            <textarea
              name="biography"
              id="biography"
              value={data.biography || ''}
              onChange={(e) => setData('biography', e.target.value)}
              className="border-gray-600 rounded shadow-sm w-full"
            />
            {errors.biography && <div className="text-red-500 text-sm">{errors.biography}</div>}
          </div>
            <div className="mb-4">
              <label htmlFor="role" className="block font-semibold">Role: </label> 
              <select
                name="role"
                id="role"
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
                className="border-gray-600 rounded shadow-sm w-full"
              >
                <option className='text-gray-400' value="">Assign a role</option>
                {roles.map((role) => (
                  <option className='text-gray-400' key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
            </div>
          <button
            type="submit"
            disabled={processing}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            {processing ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
