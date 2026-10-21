<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MataKuliahResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kode_mk' => $this->kode_mk,
            'nama_mk' => $this->nama_mk,
            'sks' => $this->sks,
            'semester' => $this->semester,
            'status_aktif' => $this->status_aktif,
            'program_studi' => $this->whenLoaded('programStudi', function () {
                return [
                    'id' => $this->programStudi->id,
                    'kode_prodi' => $this->programStudi->kode_prodi,
                    'nama_prodi' => $this->programStudi->nama_prodi,
                    'jenjang' => $this->programStudi->jenjang,
                ];
            }),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
