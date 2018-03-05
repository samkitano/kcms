'use strict'

import { Path } from './Path'
import { Menu } from './Menu'
import { Form } from './Form'
import { Panel } from './Panel'
import { Radio } from './Radio'
import { Label } from './Label'
import { Tools } from './Tools'
import { Widget } from './Widget'
import { Spacer } from './Spacer'
import { Window } from './Window'
import { Layout } from './Layout'
import { Iframe } from './Iframe'
import { Slider } from './Slider'
import { Button } from './Button'
import { MenuBar } from './MenuBar'
import { ListBox } from './ListBox'
import { Toolbar } from './Toolbar'
import { Factory } from './Factory'
import { InfoBox } from './InfoBox'
import { Tooltip } from './Tooltip'
import { Control } from './Control'
import { Movable } from './Movable'
import { TextBox } from './TextBox'
import { DropZone } from './DropZone'
import { TabPanel } from './TabPanel'
import { ComboBox } from './ComboBox'
import { FieldSet } from './FieldSet'
import { MenuItem } from './MenuItem'
import { Checkbox } from './Checkbox'
import { Selector } from './Selector'
import { FormItem } from './FormItem'
import { Throbber } from './Throbber'
import { Progress } from './Progress'
import { ColorBox } from './ColorBox'
import { FitLayout } from './FitLayout'
import { Resizable } from './Resizable'
import { Container } from './Container'
import { SelectBox } from './SelectBox'
import { FilePicker } from './FilePicker'
import { GridLayout } from './GridLayout'
import { Scrollable } from './Scrollable'
import { FloatPanel } from './FloatPanel'
import { MessageBox } from './MessageBox'
import { FlexLayout } from './FlexLayout'
import { FlowLayout } from './FlowLayout'
import { DragHelper } from './DragHelper'
import { Collection } from './Collection'
import { MenuButton } from './MenuButton'
import { ReflowQueue } from './ReflowQueue'
import { SplitButton } from './SplitButton'
import { ColorButton } from './ColorButton'
import { StackLayout } from './StackLayout'
import { ButtonGroup } from './ButtonGroup'
import { ElementPath } from './ElementPath'
import { PanelButton } from './PanelButton'
import { ColorPicker } from './ColorPicker'
import { ResizeHandle } from './ResizeHandle'
import { Notification } from './Notification'
import { BrowseButton } from './BrowseButton'
import { FormatControls } from './FormatControls'
import { AbsoluteLayout } from './AbsoluteLayout'
import { KeyboardNavigation } from './KeyboardNavigation'

let getApi = function () {
  return {
    Selector,
    Collection,
    ReflowQueue,
    Control,
    Factory,
    KeyboardNavigation,
    Container,
    DragHelper,
    Scrollable,
    Panel,
    Movable,
    Resizable,
    FloatPanel,
    Window,
    MessageBox,
    Tooltip,
    Widget,
    Progress,
    Notification,
    Layout,
    AbsoluteLayout,
    Button,
    ButtonGroup,
    Checkbox,
    ComboBox,
    ColorBox,
    PanelButton,
    ColorButton,
    ColorPicker,
    Path,
    ElementPath,
    FormItem,
    Form,
    FieldSet,
    FilePicker,
    FitLayout,
    FlexLayout,
    FlowLayout,
    FormatControls,
    GridLayout,
    Iframe,
    InfoBox,
    Label,
    Toolbar,
    MenuBar,
    MenuButton,
    MenuItem,
    Throbber,
    Menu,
    ListBox,
    Radio,
    ResizeHandle,
    SelectBox,
    Slider,
    Spacer,
    SplitButton,
    StackLayout,
    TabPanel,
    TextBox,
    DropZone,
    BrowseButton
  }
}

let appendTo = target => {
  if (target.ui) {
    Tools.each(getApi(), (ref, key) => {
      target.ui[key] = ref
    })
  } else {
    target.ui = getApi()
  }
}

let registerToFactory = () => {
  Tools.each(getApi(), (ref, key) => {
    Factory.add(key, ref)
  })
}

let Api = { appendTo, registerToFactory }

export { Api }
