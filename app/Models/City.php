<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class City extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'estado', 'dt_fundacao'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function cityNeighborhood()
    {
        return $this->hasMany(CityNeighborhood::class, 'city_id', 'id');
    }

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'dt_fundacao' => 'datetime:d/m/Y',
    ];
}
