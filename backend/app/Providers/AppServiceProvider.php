<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\MyDefined\Beauty\Repository\WKOrdersRepoInterface::class, \App\MyDefined\Beauty\Repository\WKOrdersRepository::class);
        $this->app->bind(\App\MyDefined\Repository\SuperMarket\CreateRepoInterface::class, \App\MyDefined\Repository\SuperMarket\CreateRepository::class);
        $this->app->bind(\App\MyDefined\Repository\SuperMarket\GetRepoInterface::class, \App\MyDefined\Repository\SuperMarket\GetRepository::class);
        $this->app->bind(\App\MyDefined\Repository\SuperMarket\UpdateRepoInterface::class, \App\MyDefined\Repository\SuperMarket\UpdateRepository::class);
        
        $this->app->bind(\App\MyDefined\Repository\Taxi\CreateRepoInterface::class, \App\MyDefined\Repository\Taxi\CreateRepository::class);
        $this->app->bind(\App\MyDefined\Repository\Taxi\GetRepoInterface::class, \App\MyDefined\Repository\Taxi\GetRepository::class);
        $this->app->bind(\App\MyDefined\Repository\Taxi\UpdateRepoInterface::class, \App\MyDefined\Repository\Taxi\UpdateRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
