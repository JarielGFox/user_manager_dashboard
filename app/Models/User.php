<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'date_of_birth',
        'email',
        'username',
        'password',
        'avatar',
        'phone',
        'biography',
        'address',
        'role',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole(string $roleKey): bool
    {
        $roleId = config("roles.$roleKey.id");
        return $this->roles->contains('id', $roleId);
    }

    public function hasRoleAtLeast(string $roleKey): bool
    {
        $requiredLevel = config("roles.$roleKey.level");

        // Get the highest level among this user's roles
        $userMaxLevel = $this->roles
            ->map(fn($role) => config("roles." . strtolower($role->name) . ".level"))
            ->max();

        return $userMaxLevel >= $requiredLevel;
    }
}
