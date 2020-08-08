import React from 'react'
import styled, { css } from 'styled-components'

const PaginationNumbers = ({ state, dispatch }) => {
  return (
    <PageNumberWrapper>
      <PaginateButton
        disabled={!state.canPrevPage}
        onClick={dispatch('PREV_PAGE')}
      >
        &larr;{' '}
      </PaginateButton>
      {[...Array(state.totalPages)].map((_e, i) => {
        return (
          <StyledPageNumber
            onClick={dispatch('GOTO_PAGE', { page: i + 1 })}
            active={state.currentPage === i + 1}
            key={i}
          >
            {i + 1}
          </StyledPageNumber>
        )
      })}
      <PaginateButton
        disabled={!state.canNextPage}
        onClick={dispatch('NEXT_PAGE')}
      >
        &rarr;
      </PaginateButton>
    </PageNumberWrapper>
  )
}

const Pager = ({ state, dispatch }) => {
  return (
    <PagerWrapper>
      <PageDisplay>
        Showing {state.showingStartAt + 1} - {state.showingEndAt} of{' '}
        {state.totalCounts}
      </PageDisplay>
      <PaginationNumbers state={state} dispatch={dispatch} />
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
  margin-right: 20px;
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
  margin: 10px 10px;
  color: #a4b3b8;
`

export default Pager
