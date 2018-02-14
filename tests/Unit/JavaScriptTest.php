<?php

namespace Tests\Unit;

use JS;
use stdClass;
use App\Kcms\Services\Auth\Users\User;

class JavaScriptTest extends TestCase
{
    /**
     * @test
     */
    public function testItCanParseStrings()
    {
        $js = JS::inject(['foo' => 'bar']);

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = \'bar\';', $js);
    }

    /**
     * @test
     */
    public function testItCanParseArrays()
    {
        $js = JS::inject(['foo' => ['bar' => 'baz']]);

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = {"bar":"baz"};', $js);
    }

    /**
     * @test
     */
    public function testItCanParseJson()
    {
        $json = json_encode(['bar' => 'baz']);
        $js = JS::inject(['foo' => $json]);

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = \'{"bar":"baz"}\';', $js);
    }

    /**
     * @test
     */
    public function testItCanParseBooleans()
    {
        $js = JS::inject(['foo' => false, 'bar' => true]);

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = false;kcms.bar = true;', $js);
    }

    /**
     * @test
     */
    public function testItCanParseNull()
    {
        $js = JS::inject(['foo' => null]);

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = null;', $js);
    }

    /**
     * @test
     */
    public function testItCanParseNumbers()
    {
        $js = JS::inject(['foo' => 10, 'bar' => 1.1]);

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = 10;kcms.bar = 1.1;', $js);
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

        $this->assertEquals('window.kcms = window.kcms || {};kcms.foo = {"foo":"bar","bar":"baz"};', $js);
    }

    /**
     * @test
     */
    public function testItCanParseObjects()
    {
        $obj = User::first();
        $js = JS::inject(['foo' => $obj]);
        $la = $obj->last_active_at ? "\"{$obj->last_active_at}\"" : 'null';

        $this->assertEquals(
            'window.kcms = window.kcms || {};kcms.foo = {"id":1,"email":"'.$obj->email
                .'","first_name":"'.$obj->first_name
                .'","last_name":"'.$obj->last_name.'","locale":"en","last_active_at":'.$la
                .',"verified":"'.$obj->verified.'","created_at":"'.$obj->created_at
                .'","updated_at":"'.$obj->updated_at.'"};',
            $js
        );
    }
}
