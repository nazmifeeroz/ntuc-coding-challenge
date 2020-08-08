import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Ellipsis from '_components/ellipsis'

dayjs.extend(advancedFormat)

const CouponsTable = ({ coupons }) => {
  return (
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
  )
}

const StyledTable = styled.table`
  width: 100vw;
  border-collapse: collapse;
  table-layout: fixed;

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

export default CouponsTable
