import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Drawer,
  Input,
  Carousel,
  CarouselItem,
  Radio,
  RadioGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Message,
  Tag,
  Collapse,
  CollapseItem,
  Skeleton,
  SkeletonItem,
  Tabs,
  TabPane,
  // Popover,
  // Select,
  // Option,
  // Button,
  // Tooltip,
  // Alert,
  // Row,
  // Col,
  // ColorPicker,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // Steps,
  // Step,
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/es'
import locale from 'element-ui/lib/locale'

export default () => {
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Drawer)
  Vue.use(Input)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)

  locale.use(lang)
  Vue.use(Tag)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Skeleton)
  Vue.use(SkeletonItem)

  Vue.use(Tabs)
  Vue.use(TabPane)

  // Vue.use(Popover)
  Vue.use(Loading.directive)
  Vue.prototype.$message = Message
  // Vue.use(Checkbox)
  // Vue.use(CheckboxButton)
  // Vue.use(CheckboxGroup)
  // Vue.use(Select)
  // Vue.use(Option)
  // Vue.use(Button)
  // Vue.use(Tooltip)
  // Vue.use(Alert)
  // Vue.use(Row)
  // Vue.use(Col)
  // Vue.use(ColorPicker)
  // Vue.use(Steps)
  // Vue.use(Step)
}
