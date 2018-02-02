<?php

namespace Tests\Unit;

use JS;
use stdClass;
use Tests\TestCase;
use App\Kcms\Services\Auth\Users\User;

class JavaScriptTest extends TestCase
{
    /**
     * @test
     */
    public function testItCanParseStrings()
    {
        $js = JS::inject(['foo' => 'bar']);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = \'bar\';', $js);
    }

    /**
     * @test
     */
    public function testItCanParseArrays()
    {
        $js = JS::inject(['foo' => ['bar' => 'baz']]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = {"bar":"baz"};', $js);
    }

    /**
     * @test
     */
    public function testItCanParseJson()
    {
        $json = json_encode(['bar' => 'baz']);
        $js = JS::inject(['foo' => $json]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = \'{"bar":"baz"}\';', $js);
    }

    /**
     * @test
     */
    public function testItCanParseBooleans()
    {
        $js = JS::inject(['foo' => false, 'bar' => true]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = false;kitano.bar = true;', $js);
    }

    /**
     * @test
     */
    public function testItCanParseNull()
    {
        $js = JS::inject(['foo' => null]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = null;', $js);
    }

    /**
     * @test
     */
    public function testItCanParseNumbers()
    {
        $js = JS::inject(['foo' => 10, 'bar' => 1.1]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = 10;kitano.bar = 1.1;', $js);
    }

    /**
     * @test
     */
    public function testItCanParseStdObjects()
    {
        $obj = new stdClass;
        $obj->foo = 'bar';
        $obj->bar = 'baz';

        $js = JS::inject(['foo' => $obj]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = {"foo":"bar","bar":"baz"};', $js);
    }

    /**
     * @test
     */
    public function testItCanParseObjects()
    {
        $obj = User::first();
        $js = JS::inject(['foo' => $obj]);

        $this->assertEquals('window.kitano = window.kitano || {};kitano.foo = {"id":1,"email":"kcarter@example.net","first_name":"Abigale","last_name":"Eichmann","locale":"en","last_active_at":"2018-02-01 18:59:12","verified":"1","created_at":"2018-02-01 18:59:12","updated_at":"2018-02-01 18:59:12"};', $js);
    }
}
