import React from 'react'
import styled, { css } from 'styled-components'

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

const Pager = ({
  canNextPage,
  canPrevPage,
  currentPage,
  gotoPage,
  nextPage,
  prevPage,
  showingEndAt,
  showingStartAt,
  totalCounts,
  totalPages,
}) => {
  return (
    <PagerWrapper>
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
    </PagerWrapper>
  )
}

const PagerWrapper = styled.div`
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

export default Pager
