/* eslint-disable camelcase */
import request from '@/utils/request'
// 获取文章列表
export const getArticles = ({
  // 频道id
  channel_id,
  // 时间戳
  timestamp,
  // 是否包含置顶(1包含，0不包含)
  with_top
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}
