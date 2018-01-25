<?php

namespace Tests\Analysis;

use PHPUnit\Framework\TestCase;
use GrahamCampbell\Analyzer\AnalysisTrait;

class AnalysisTest extends TestCase
{
    use AnalysisTrait;

    public function getPaths()
    {
        return [
            __DIR__.'/../../app',
        ];
    }
}
