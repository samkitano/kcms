'use strict'

import { getMenubar } from './getMenubar'

let hasMenubar = editor => getMenubar(editor) !== false

export { hasMenubar }
