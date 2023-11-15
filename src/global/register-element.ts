import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import {
  ElButton,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon
} from 'element-plus'

const components = [ElButton, ElInput, ElRadio, ElTabPane, ElTabs, ElIcon]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
