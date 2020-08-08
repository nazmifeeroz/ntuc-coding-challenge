import React from 'react'
import styled from 'styled-components'
import Pager from '_components/Pager'
import CouponsTable from '_components/CouponsTable'
import useCouponsTable from '_hooks/useCouponsTable'

const IndexPage = (props) => {
  const {
    data: coupons,
    canNextPage,
    canPrevPage,
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
      <CouponsTable coupons={coupons} />
      <Pager
        canNextPage={canNextPage}
        canPrevPage={canPrevPage}
        currentPage={currentPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        prevPage={prevPage}
        showingEndAt={showingEndAt}
        showingStartAt={showingStartAt}
        totalCounts={totalCounts}
        totalPages={totalPages}
      />
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

export default IndexPage
