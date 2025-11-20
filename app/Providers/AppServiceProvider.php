<?php

namespace App\Providers;

use App\Services\AntrianService;
use App\Services\PatientRegistrationService;
use App\Services\PoliklinikService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(PatientRegistrationService::class, function ($app) {
            return new PatientRegistrationService();
        });
         $this->app->singleton(PoliklinikService::class, function ($app) {
            return new PoliklinikService();
        });
          $this->app->singleton(AntrianService::class, function ($app) {
            return new AntrianService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
