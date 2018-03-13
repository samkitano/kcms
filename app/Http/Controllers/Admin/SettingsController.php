<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Contracts\NamingContract;
use App\Kcms\Services\JavaScript\TranslateToJavaScript;

class SettingsController extends Controller implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __t('menu.system');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return __t('menu.settings');
    }


    public function index()
    {
        return view('admin.settings');
    }

    /**
     * Clear application cache
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function clearCache()
    {
        cache()->flush();

        return response()->json('OK', 200);
    }

    /**
     * Refresh javascript translations
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function trans()
    {
        return response()->json(
            TranslateToJavaScript::writeFiles()
            ? 'done'
            : 'skipped'
        );
    }

    public function delStorage()
    {
        $this->recursive_rmdir(public_path('media'));

        \DB::table('media')->truncate();

        return response()->json('OK', 200);
    }

    protected function recursive_rmdir($dir) {
        if( is_dir($dir) ) {
            $files = array_diff( scandir($dir), array('..', '.') );

            foreach ($files as $file) {
                $filePath = $dir."/".$file;

                is_dir($filePath)
                    ? $this->recursive_rmdir($filePath)
                    : unlink($filePath);

            }

            rmdir($dir);
        }
    }
}
