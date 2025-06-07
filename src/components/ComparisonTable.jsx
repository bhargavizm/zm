import React from 'react'

const rows = [
  { feature: 'Dynamic QR Codes', free: false, starter: true, pro: true, ultima: true },
  { feature: 'Scan Limit', free: '100/mo', starter: '1,000/mo', pro: '10,000/mo', ultima: 'Unlimited' },
  { feature: 'White-label', free: false, starter: false, pro: false, ultima: true },
  { feature: 'Priority Support', free: false, starter: false, pro: true, ultima: true },
]

function CheckMark(available) {
  if (typeof available === 'string') return available
  return available ? '✔️' : '—'
}

const ComparisonTable=() => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 font-semibold">Features</th>
            <th className="p-3 font-semibold">Free</th>
            <th className="p-3 font-semibold">Starter</th>
            <th className="p-3 font-semibold">Pro</th>
            <th className="p-3 font-semibold">Ultima</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{r.feature}</td>
              <td className="p-3 text-center">{CheckMark(r.free)}</td>
              <td className="p-3 text-center">{CheckMark(r.starter)}</td>
              <td className="p-3 text-center">{CheckMark(r.pro)}</td>
              <td className="p-3 text-center">{CheckMark(r.ultima)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable