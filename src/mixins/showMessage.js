import { Notify } from 'vant'
import { duration, className } from '@/configs/noticeConfig'

export default {
  methods: {
    showSuccess (message) {

      this.$message({
        type: 'success',
        customClass: className,
        duration,
        message
      })
    }
  }
}
