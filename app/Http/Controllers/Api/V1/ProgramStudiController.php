<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProgramStudiResource;
use App\Models\ProgramStudi;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProgramStudiController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ProgramStudiResource::collection(
            ProgramStudi::query()->orderBy('kode_prodi')->get()
        );
    }
}
