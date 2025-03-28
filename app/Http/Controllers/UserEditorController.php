<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// Richiamo il namespace del modello che mi serve
use App\Models\User;
use Inertia\Inertia;

class UserEditorController extends Controller
{
    // Mostra la lista di tutti gli user
    public function index() {
        $users = User::all();

        // Load the roles relationship
        $users = User::with('roles')->get();
        //Restituisco la view e passo i dati tramite compact creando un array
        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function edit(User $user)
    {
        // Load the roles relationship
        $user->load('roles');

        // Assume the user has only one role, extract it:
        $currentRole = $user->roles->first();
        $user->role = $currentRole ? $currentRole->id : null;

        // Retrieve roles from config and transform them:
        $rolesConfig = config('roles');
        $roles = collect($rolesConfig)->map(function ($value, $key) {
            return [
                'id'   => $value,
                'name' => ucwords($key),
            ];
        })->values();

        return Inertia::render('admin/users/edit', [
            'user'  => $user,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user) {

        // Prendiamo i ruoli dal config, tramite array_values che restituisce i valori dell'array
        $allowedRoles = implode(',', array_values(config('roles')));

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'surname' => 'required|string|max:255',
            'date_of_birth' => 'required|string',
            'avatar' => 'nullable|string',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'biography' => 'nullable|string',
        ]);

        $roleData = $request->validate([
            'role' => 'required|integer|in:' . $allowedRoles,
        ]);

        $user->update($validated);

        $user->roles()->sync([$roleData['role']]);

        return redirect()->route('userEditor.index')->with('success', 'User updated successfully');
    }

    public function deleteIndex()
    {
        /** @var User $authUser */

        $user = Auth::user();

        if (!$user || !$user->hasRoleAtLeast('admin')) {
            abort(403, 'Unauthorized action.');
        }


        $users = User::with('roles')->get();

        return \Inertia\Inertia::render('admin/users/delete', [
            'users' => $users,
        ]);
    }

    public function destroy(User $user)
    {
        // Optional: add a role check
        if (!auth()->user()?->hasRoleAtLeast('admin')) {
            abort(403, 'Unauthorized');
        }

        if(user()->hasRoleAtLeast('admin')) {
            abort(403, 'Unauthorized');
        }

        $user->delete();

        return redirect()->route('userEditor.delete')
            ->with('success', 'User deleted successfully');
    }
}
