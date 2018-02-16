<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Kcms\Services\JavaScript\TranslateToJavaScript;

class jstrans extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:jstrans';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or Update JavaScript Translations File';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $done = TranslateToJavaScript::writeFiles();

        $this->info(
            $done
                ? __t('alerts.translations_done')
                : __t('alerts.translations_skipped')
        );
    }
}
