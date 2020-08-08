import React from 'react'
import { render, screen } from '@testing-library/react'
import IndexPage from '_pages'

const mockCoupons = [
  {
    couponCode: 'NPK9KCN3I1Y0RLC',
    discount: 20,
    expiryDate: '2020-12-31',
    id: 15195,
    maxRedemption: 1,
    startDate: '2020-07-08',
    status: 'ENABLED',
  },
]

test('shows Index page template', () => {
  render(<IndexPage pageProps={{ coupons: mockCoupons, totalCounts: 20 }} />)

  expect(screen.queryByText('Coupon')).toBeTruthy()
})

test('shows error message when api is down', () => {
  render(<IndexPage pageProps={{ error: 'error' }} />)

  expect(screen.queryByText('error')).toBeTruthy()
})
