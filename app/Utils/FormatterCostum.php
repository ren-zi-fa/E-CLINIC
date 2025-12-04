<?php

namespace App\Utils;

class FormatterCostum
{
    public static function flatten(array $jadwal): array
    {
        $flat = [];

        foreach ($jadwal as $day => $value) {
            if (is_array($value)) {
                $flat[$day] = count($value) === 0
                    ? '-'
                    : implode(', ', $value);
            } else {
                $flat[$day] = $value;
            }
        }

        return $flat;
    }
}
