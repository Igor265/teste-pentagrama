<?php

namespace App\Http\Controllers;

use App\Http\Requests\CityStoreRequest;
use App\Http\Requests\CityUpdateRequest;
use App\Http\Requests\NeighborhoodStoreRequest;
use App\Http\Resources\CityResource;
use App\Http\Resources\NeighborhoodResource;
use App\Models\City;
use App\Models\CityNeighborhood;
use App\Models\Neighborhood;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = City::query()
            ->with('cityNeighborhood.neighborhood')
            ->orderBy('id');

        $this->applyFilters($query, $request->all());

        return CityResource::collection(
            $query->paginate(9)
        );
    }

    public function listCitys()
    {
        return City::orderBy('id')->get()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CityStoreRequest $request)
    {
        $data = $request->validated();

        $city = new City();

        $city->nome = $data['nome'];
        $city->estado = $data['estado'];
        $city->dt_fundacao = $data['dt_fundacao'];
        $city->save();

        return new CityResource($city);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $response = $this->getCityAndNeighborhoods($id);

        return response($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CityUpdateRequest $request, string $id)
    {
        $data = $request->validated();

        $city = City::find($id);

        $city->nome = $data['nome'];
        $city->estado = $data['estado'];
        $city->dt_fundacao = $data['dt_fundacao'];
        $city->save();

        return new CityResource($city);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        City::where('id', $id)->delete();

        return response('', 204);
    }

    public function storeNeighborhood(NeighborhoodStoreRequest $request)
    {
        $data = $request->validated();
        $neighborhood = new Neighborhood();

        $neighborhood->bairro = $data['bairro'];
        $neighborhood->save();

        $cityNeighborhood = new CityNeighborhood();
        $cityNeighborhood->city_id = $data['cidade'];
        $cityNeighborhood->neighborhood_id = $neighborhood->id;
        $cityNeighborhood->save();

        return new NeighborhoodResource($neighborhood);
    }

    private function getCityAndNeighborhoods($id)
    {
        $city = City::where('id', $id)
            ->get();
        $neighborhoodIds = CityNeighborhood::where('city_id', $id)
            ->pluck('neighborhood_id')
            ->toArray();
        $neighborhoods = Neighborhood::whereIn('id', $neighborhoodIds)->pluck('bairro');

        return [
            'city' => $city,
            'neighborhoods' => $neighborhoods
        ];
    }

    private function applyFilters(&$query, $filters)
    {
        if (Arr::get($filters, 'cidade')) {
            $query->where('nome', 'ilike', "%{$filters['cidade']}%");
        }
        if (Arr::get($filters, 'bairro')) {
            $query->whereHas('cityNeighborhood.neighborhood', function($q) use ($filters) {
                $q->where('bairro', 'ilike', "%{$filters['bairro']}%");
            });
        }
        if (Arr::get($filters, 'dataInicio') && Arr::get($filters, 'dataFim')) {
            $query->whereBetween('dt_fundacao', [$filters['dataInicio'], $filters['dataFim']]);
        } else if (Arr::get($filters, 'dataFim')) {
            $query->where('dt_fundacao', $filters['dataFim']);
        } else if (Arr::get($filters, 'dataInicio')) {
            $query->where('dt_fundacao', $filters['dataInicio']);
        }
    }
}
