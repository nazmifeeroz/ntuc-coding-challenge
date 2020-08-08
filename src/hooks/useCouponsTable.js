import { useEffect, useState } from 'react'
import sortBy from 'lodash.sortby'

const COUPONS_PER_PAGE = 20

const useCouponsTable = ({ pageProps: { coupons, totalCounts, error } }) => {
  if (error) return [{ error }]

  const [currentPage, setPage] = useState(1)
  const [data, setData] = useState([])
  const [isSorted, setIsSorted] = useState(false)

  const showingStartAt =
    currentPage > 1 ? currentPage * COUPONS_PER_PAGE - COUPONS_PER_PAGE : 0

  const showingEndAt =
    currentPage > 1 ? showingStartAt + COUPONS_PER_PAGE : COUPONS_PER_PAGE

  useEffect(() => {
    setData(
      coupons.slice(showingStartAt, showingEndAt).map((coupon) => ({
        couponCode: coupon.couponCode,
        discount: coupon.discount,
        expiryDate: coupon.expiryDate,
        id: coupon.id,
        maxRedemption: coupon.maxRedemption,
        status: coupon.status,
        startDate: coupon.startDate,
      }))
    )
  }, [showingEndAt, showingStartAt])

  const totalPages = totalCounts / COUPONS_PER_PAGE
  const canNextPage = currentPage !== totalPages
  const canPrevPage = currentPage !== 1

  const dispatchReducer = (action, payload = null) => {
    switch (action) {
      case 'NEXT_PAGE':
        return () => {
          if (canNextPage) {
            setPage(currentPage + 1)
            setIsSorted(false)
          }
        }
      case 'PREV_PAGE':
        return () => {
          if (canPrevPage) {
            setPage(currentPage - 1)
            setIsSorted(false)
          }
        }
      case 'GOTO_PAGE':
        return () => {
          setPage(payload.page)
          setIsSorted(false)
        }
      case 'SORT_BY':
        return () => {
          setData(sortBy(data, [(o) => o[payload.sortBy]]))
          setIsSorted(true)
        }

      default:
        return action
    }
  }

  return [
    {
      canNextPage,
      canPrevPage,
      currentPage,
      data,
      isSorted,
      showingEndAt,
      showingStartAt,
      totalCounts,
      totalPages,
    },
    dispatchReducer,
  ]
}

export default useCouponsTable
