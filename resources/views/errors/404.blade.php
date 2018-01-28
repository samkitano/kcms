@include((request()->isAdmin() ? 'admin' : 'front').'.errors.404')
