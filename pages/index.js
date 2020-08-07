import React from 'react'
import styled from 'styled-components'

const COUPONS_PER_PAGE = 20

const IndexPage = ({ pageProps }) => {
  console.log('coupons', pageProps)
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Coupon</th>
            <th>Discount</th>
            <th>Limit</th>
            <th>Validity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageProps.coupons.map((coupon) => (
            <tr>
              <td>{coupon.couponCode}</td>
              <td>{coupon.discount}</td>
              <td>{coupon.maxRedemption}</td>
              <td>{coupon.expiryDate}</td>
              <td>{coupon.status}</td>
              <td>herllo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default IndexPage

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(
      'https://storage.googleapis.com/coding_challenge_assets/data.json'
    )

    const coupons = await res.json()

    const couponsAt = query.page ? query.page * COUPONS_PER_PAGE : 0

    const sanitizedCoupons = coupons.data.coupon
      .slice(couponsAt, couponsAt + COUPONS_PER_PAGE)
      .map((coupon) => ({
        couponCode: coupon.couponCode,
        discount: coupon.discount,
        expiryDate: coupon.expiryDate,
        id: coupon.id,
        maxRedemption: coupon.maxRedemption,
        status: coupon.status,
      }))

    return {
      props: {
        page: query?.page || null,
        totalPages: coupons.data.count / COUPONS_PER_PAGE,
        coupons: sanitizedCoupons,
      },
    }
  } catch {
    return {
      props: {
        error: 'error in server',
      },
    }
  }
}
