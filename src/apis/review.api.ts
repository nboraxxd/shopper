import { ReviewsReqBody, ReviewsResponse } from '@/types/review.type'
import http from '@/utils/http'

const REVIEW_URL = '/review'

const reviewsApi = {
  getReviews({ productId, limit, page, signal }: ReviewsReqBody) {
    return http.get<ReviewsResponse>(`${REVIEW_URL}/${productId}`, { params: { limit, page }, signal })
  },
}

export default reviewsApi
