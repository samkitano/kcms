{{--
    Resource Index

    @param array  $items    Data for fields
    @param array  $fields   Fields to present
    @param string $resource Resource name
    @param string $model    Model Class
--}}

@extends('layouts.admin-master')

@section('title', __t("menu.{$resource}"))

@section('content')
    @component('components.create_button', [
                'href' => "/admin/{$resource}/create",
                'text' => __t("{$resource}.create"),
                'condition' => count($model::editable())
    ])@endcomponent

    @if(count($items) > 10)
        @component('components.dt-filter')@endcomponent
    @endif

    <table class="table table-striped table-hover" data-dt>
        <thead>
        <tr>
            @foreach($fields as $field)
                <th>{{ $field['label'] }}</th>
            @endforeach
        </tr>
        </thead>
        <tbody>
        @foreach($items as $row => $columns)
            <tr>
                @foreach($columns as $column => $val)
                    @if($column == 'order')
                        <td class="{{ $column }}-col">@component('components.reorder', [
                            'order' => $val['order'],
                            'maxOrder' => $val['max'],
                            'controller' => 'Admin\ArticlesController',
                            'rid' => $val['id'],
                        ])@endcomponent</td>
                    @else
                        <td class="{{ $column }}-col">{{ $val }}</td>
                    @endif
                @endforeach
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
