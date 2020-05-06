import Vue from 'vue'
import svgIcon from './svgIcon'
import table from './table'
import card from './card'
import checkboxGroup from './checkboxGroup'
import addButton from './addButton'
import button from './button'
import dialog from './dialog'
import formDialog from './formDialog'
import form from './form/formView'
import formItem from "./form/formItem";


Vue.component('svgIcon', svgIcon)
Vue.component('sasTable', table)
Vue.component('sasDialog', dialog)
Vue.component('sasFormDialog', formDialog)
Vue.component('sasFormView',form)
Vue.component('sasFormItem',formItem)
Vue.component('sasCard', card)
Vue.component('sasButton', button)
Vue.component('sasAddButton', addButton)
Vue.component('sasCheckboxGroup', checkboxGroup)
