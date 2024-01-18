import LeeTableVue from "./src/LeeTable.vue"
import { withInstall } from "@/utils/install"

export const LeeTable = withInstall(LeeTableVue)
export default LeeTable

export type * from "./src/types/index"
