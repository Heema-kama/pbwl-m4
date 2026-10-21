<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramStudiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kode_prodi' => $this->kode_prodi,
            'nama_prodi' => $this->nama_prodi,
            'jenjang' => $this->jenjang,
        ];
    }
}
