<?php

namespace App\Rules;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Contracts\Validation\ImplicitRule;

class EmailOrPhone implements Rule, ImplicitRule
{
    protected string $table;
    protected string $emailColumn;
    protected string $phoneColumn;

    /**
     * Create a new rule instance.
     *
     * @param string $table
     * @param string $emailColumn
     * @param string $phoneColumn
     */
    public function __construct(string $table, string $emailColumn, string $phoneColumn)
    {
        $this->table = $table;
        $this->emailColumn = $emailColumn;
        $this->phoneColumn = $phoneColumn;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        // Check if it's a valid email
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return $this->isUnique($value, $this->emailColumn);
        }

        // Check if it's a valid Indonesian phone number
        $pattern = '/^08[0-9]{8,11}$/';
        if (preg_match($pattern, $value)) {
            return $this->isUnique($value, $this->phoneColumn);
        }

        return false;
    }

    /**
     * Check if the value is unique in the database.
     *
     * @param  mixed  $value
     * @param  string $column
     * @return bool
     */
    protected function isUnique($value, string $column): bool
    {
        return DB::table($this->table)->where($column, $value)->doesntExist();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return ":attribute harus berupa email atau nomor telepon yang valid dan unik.";
    }
}
