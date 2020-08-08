import { useState } from 'react'

const COUPONS_PER_PAGE = 20

const useCouponsTable = ({ pageProps: { coupons, totalCounts } }) => {
  const [currentPage, setPage] = useState(1)

  const showingStartAt =
    currentPage > 1 ? currentPage * COUPONS_PER_PAGE - COUPONS_PER_PAGE : 0

  const showingEndAt =
    currentPage > 1 ? showingStartAt + COUPONS_PER_PAGE : COUPONS_PER_PAGE

  const sanitizedCoupons = coupons
    .slice(showingStartAt, showingEndAt)
    .map((coupon) => ({
      couponCode: coupon.couponCode,
      discount: coupon.discount,
      expiryDate: coupon.expiryDate,
      id: coupon.id,
      maxRedemption: coupon.maxRedemption,
      status: coupon.status,
      startDate: coupon.startDate,
    }))

  const totalPages = totalCounts / COUPONS_PER_PAGE
  const canNextPage = currentPage !== totalPages
  const canPrevPage = currentPage !== 1

  return {
    canNextPage,
    canPrevPage,
    data: sanitizedCoupons,
    gotoPage: setPage,
    nextPage: () => canNextPage && setPage(currentPage + 1),
    currentPage,
    prevPage: () => canPrevPage && setPage(currentPage - 1),
    showingEndAt,
    showingStartAt,
    totalCounts,
    totalPages,
  }
}

export default useCouponsTable
