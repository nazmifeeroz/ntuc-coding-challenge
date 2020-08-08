import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Ellipsis from '_components/ellipsis'

dayjs.extend(advancedFormat)

const COUPONS_PER_PAGE = 20

const PaginationNumbers = ({
  canNextPage,
  canPrevPage,
  gotoPage,
  nextPage,
  currentPage,
  prevPage,
  totalPages,
}) => (
  <PageNumberWrapper>
    <PaginateButton disabled={!canPrevPage} onClick={prevPage}>
      &larr;{' '}
    </PaginateButton>
    {[...Array(totalPages)].map((_e, i) => {
      return (
        <StyledPageNumber
          onClick={() => gotoPage(i + 1)}
          active={currentPage === i + 1}
          key={i}
        >
          {i + 1}
        </StyledPageNumber>
      )
    })}{' '}
    <PaginateButton disabled={!canNextPage} onClick={nextPage}>
      &rarr;
    </PaginateButton>
  </PageNumberWrapper>
)

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

const IndexPage = (props) => {
  const {
    canNextPage,
    canPrevPage,
    data: coupons,
    gotoPage,
    nextPage,
    currentPage,
    prevPage,
    showingEndAt,
    showingStartAt,
    totalCounts,
    totalPages,
  } = useCouponsTable(props)

  return (
    <Container>
      <StyledTable>
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
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.couponCode}</td>
              <td>
                ${coupon.discount}
                <span>Cart Discount</span>
              </td>
              <td>
                <span>{coupon.maxRedemption} per user</span>
              </td>
              <td>
                {dayjs(coupon.startDate).format('Do MMM YYYY')}
                <span>{dayjs(coupon.expiryDate).format('Do MMM YYYY')}</span>
              </td>
              <td>
                <span>{coupon.status}</span>
              </td>
              <td>
                <Ellipsis />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pager>
        <PageDisplay>
          Showing {showingStartAt + 1} - {showingEndAt} of {totalCounts}
        </PageDisplay>
        <PaginationNumbers
          totalPages={totalPages}
          currentPage={currentPage}
          gotoPage={gotoPage}
          nextPage={nextPage}
          prevPage={prevPage}
          canNextPage={canNextPage}
          canPrevPage={canPrevPage}
        />
      </Pager>
    </Container>
  )
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(
      'https://storage.googleapis.com/coding_challenge_assets/data.json'
    )

    const coupons = await res.json()

    return {
      props: {
        coupons: coupons.data.coupon,
        totalCounts: coupons.data.count,
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

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    text-align: left;
    color: #a4b3b8;
  }

  td,
  th {
    padding: 20px 30px;
    border-bottom: 1px solid #ecf0f0;
  }

  td > span {
    display: block;
    font-size: 14px;
    color: #a4b3b8;
  }

  td:last-of-type {
    text-align: right;
  }

  tr:nth-child(odd) {
    background-color: #fbfcfc;
  }
`

const Pager = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PageNumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 30px;
`

const PaginateButton = styled.a`
  text-decoration: none;
  padding: 5px 20px;
  margin: 5px;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      color: #ced6da;
      cursor: not-allowed;
    `}
`

const StyledPageNumber = styled(PaginateButton)`
  ${(props) =>
    props.active
      ? css`
          color: #35c66b;
          border: 1.5px solid #35c66b;
          border-radius: 3px;
        `
      : css`
          color: inherit;
        `};
`

const PageDisplay = styled.div`
  margin: 10px 30px;
  color: #a4b3b8;
`

export default IndexPage
