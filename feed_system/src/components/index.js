import AuthButton from './AuthButton.vue'
import UucPagination from './UucPagination.vue'
import FileUpload from './FileUpload.vue'
import AutoTable from './AutoTable.vue'
import AutoDialog from './AutoDialog.vue'
const components = [
  AuthButton,
  UucPagination,
  FileUpload,
  AutoTable,
  AutoDialog
]
const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}
export default install
