<?php

namespace App\Console\Commands;

use App\Models\Street;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class CadastraRua extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cadastra-rua';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ceps = Street::query()->select('cep')->whereNull('rua')->get();

        $ceps->each(function ($val, $ix) {
            $rua = $this->buscarCep($val->cep)['logradouro'];
            Street::query()->where('cep', $val->cep)->update(['rua' => $rua]);
        });
    }

    private function buscarCep($cep)
    {
        $url = sprintf('https://viacep.com.br/ws/%s/json', $cep);
        return Http::get($url)->json();
    }
}
