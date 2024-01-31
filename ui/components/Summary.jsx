import { Card } from 'antd'
import React from 'react'

export default function Summary() {

  return (
    <Card title="Summary Events" style={{ width: '580px', alignSelf: 'center' }}>
      <p>People in the event right now: <strong>{0}</strong></p>
      <p>People by company in the event right now: <strong>{0}</strong></p>
      <p>People not checked-in: <strong>{0}</strong></p>
    </Card>
  )
}
