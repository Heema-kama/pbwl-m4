<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMataKuliahRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'program_studi_id' => ['required', 'integer', 'exists:program_studis,id'],
            'kode_mk' => ['required', 'string', 'max:20', 'unique:mata_kuliahs,kode_mk'],
            'nama_mk' => ['required', 'string', 'max:150'],
            'sks' => ['required', 'integer', 'between:1,6'],
            'semester' => ['required', 'integer', 'between:1,14'],
            'status_aktif' => ['sometimes', 'boolean'],
        ];
    }
}
