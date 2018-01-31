<?php

namespace Tests\Browser;

use Carbon\Carbon;
use Tests\Concerns\CreatesApplication;
use Laravel\Dusk\TestCase as BaseTestCase;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use App\Kcms\Services\Auth\Administrators\User as Admin;

abstract class DuskTestCase extends BaseTestCase
{
    use CreatesApplication;

    public static $rootAdmin;

    public static $normalAdmin;

    public static $superAdmin;

    public function setUp()
    {
        parent::setUp();

        session()->flush();

        $this->artisan('migrate');
        $this->artisan('db:seed');

        static::$rootAdmin = Admin::first();
        static::$normalAdmin = $this->createNormalAdmin();
        static::$superAdmin = $this->createSuperAdmin();
    }

    public function tearDown() {
        parent::tearDown();
    }

    /**
     * We need to change the default selector to 'html'
     * so we can acces head elements, i.e. to check
     * if forms are using the proper csrf field.
     *
     * @param RemoteWebDriver $driver
     * @return \Laravel\Dusk\Browser
     */
    protected function newBrowser($driver)
    {
        return new \Laravel\Dusk\Browser(
            $driver,
            new \Laravel\Dusk\ElementResolver($driver, 'html'));
    }

    /**
     * @return $this
     */
    public function resetVerificationsTable(): self
    {
        \DB::table('verifications')->truncate();

        return $this;
    }

    /**
     * @return $this
     */
    public function truncateAdminsTable(): self
    {
        \DB::table('administrators')->truncate();

        return $this;
    }

    /**
     * Creates a verified, non-super-user admin
     *
     * @return Admin
     */
    public function createNormalAdmin(): Admin
    {
        $newAdminData = [
            'first_name' => 'Dusky',
            'last_name' => 'Testman',
            'email' => 'dusky_admin@tests.local',
            'password' => 'secret',
            'role' => 'admin',
            'verified' => true,
            'super_admin' => false,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];

        return Admin::create($newAdminData);
    }

    /**
     * Creates a super-admin
     *
     * @return Admin
     */
    public function createSuperAdmin(): Admin
    {
        $newAdminData = [
            'first_name' => 'Dusky',
            'last_name' => 'Supaman',
            'email' => 'dusky_supa@tests.local',
            'password' => 'secret',
            'role' => 'root',
            'verified' => true,
            'super_admin' => true,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];

        return Admin::create($newAdminData);
    }

    /**
     * @param $user
     * @return mixed
     */
    public function getVerificationToken($user)
    {
        $v = \DB::table('verifications')
            ->where('user_id', '=',$user->id)
            ->first();

        return $v->token;
    }

    /**
     * Mock csrf field
     *
     * @param string $token
     * @return mixed
     */
    public function csrfField($token)
    {
        $field = '<input type="hidden" name="_token" value="_TOKEN_" />';

        return str_replace('_TOKEN_', $token, $field);
    }

    /**
     * Prepare for Dusk test execution.
     *
     * @beforeClass
     * @return void
     */
    public static function prepare()
    {
        static::startChromeDriver();
    }

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        $options = (new ChromeOptions)->addArguments([
            '--disable-gpu',
            '--headless'
        ]);

        return RemoteWebDriver::create(
            'http://localhost:9515', DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY, $options
            )
        );
    }
}
