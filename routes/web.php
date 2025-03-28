<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserEditorController;

// Home
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Definisce 3 rotte per: index, edit, update
Route::resource('admin/users', UserEditorController::class)
    ->except(['show']) // <- esclude la rotta show
->names([
    'index' => 'userEditor.index',
    'edit' => 'userEditor.edit',
    'update' => 'userEditor.update',
    'destroy' => 'userEditor.destroy',
]);

Route::get('admin/users/delete', [UserEditorController::class, 'deleteIndex'])
    ->name('userEditor.delete')
    ->middleware(['auth']); // <- middleware in modo che solo chi è autorizzato possa accedere

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
