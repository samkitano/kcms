{{--
    Move items order

    @param int    $order      Position
    @param int    $maxOrder   Max Position
    @param int    $rid        Resource ID
    @param string $controller Controller Name
--}}

@php
    $inactiveUp = $order == 1;
    $inactiveDown = $order == $maxOrder;
    $orderUpClass = $inactiveUp
                  ? 'order_inactive'
                  : 'order_active';
    $orderDownClass = $inactiveDown
                    ? 'order_inactive'
                    : 'order_active';
@endphp

<div class="order"
     data-order="{{ $order }}"
     data-max="{{ $maxOrder }}">

    <div class="order-buttons">
        <div class="order-top {{ $orderUpClass }}">
            @if($inactiveUp)
                <span>@include('svg.move_top')</span>
            @else
                <form action="{{ action("{$controller}@top") }}" method="POST">
                    {{ csrf_field() }}
                    <input type="hidden" name="id_top" id="id_top" value="{{ $rid }}">
                    <input type="hidden" name="_method" id="_method" value="PATCH">
                    <button class="move-first" type="submit">@include('svg.move_top')</button>
                </form>
            @endif
        </div>

        <div class="order-up {{ $orderUpClass }}">
            @if($inactiveUp)
                <span>@include('svg.move_up')</span>
            @else
                <form action="{{ action("{$controller}@up") }}" method="POST">
                    {{ csrf_field() }}
                    <input type="hidden" name="id_up" id="id_up" value="{{ $rid }}">
                    <input type="hidden" name="_method" id="_method" value="PATCH">
                    <button class="move-up" type="submit">@include('svg.move_up')</button>
                </form>
            @endif
        </div>

        <span class="order_position">{{ $order }}</span>

        <div class="order-down {{ $orderDownClass }}">
            @if($inactiveDown)
                <span>@include('svg.move_down')</span>
            @else
                <form action="{{ action("{$controller}@down", $rid) }}" method="POST">
                    {{ csrf_field() }}
                    <input type="hidden" name="id_down" id="id_down" value="{{ $rid }}">
                    <input type="hidden" name="_method" id="_method" value="PATCH">
                    <button class="move-down" type="submit">@include('svg.move_down')</button>
                </form>
            @endif
        </div>

        <div class="order-bottom {{ $orderDownClass }}">
            @if($inactiveDown)
                <span>@include('svg.move_bottom')</span>
            @else
                <form action="{{ action("{$controller}@bottom", $rid) }}" method="POST">
                    {{ csrf_field() }}
                    <input type="hidden" name="id_bottom" id="id_bottom" value="{{ $rid }}">
                    <input type="hidden" name="_method" id="_method" value="PATCH">
                    <button class="move-bottom" type="submit">@include('svg.move_bottom')</button>
                </form>
            @endif
        </div>
    </div>
</div>
