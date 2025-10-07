import React from 'react'
import { PriceHistory } from '@/lib';

interface Props {
    data:PriceHistory[]|undefined;
}

const LastPricesRecords = ({data}:Props) => {
  return (
    <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title text-lg">Recent Price Records</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {
                data && 
                data.map(
                    (record,index) => (
                        <tr key={index}>
                        <td>{record.checked_at}</td>
                        <td>${record.price}</td>
                        <td className="text-success">—</td>
                      </tr>
                    )
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default LastPricesRecords