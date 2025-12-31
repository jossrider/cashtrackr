'use client'

type percentageType = {
  percenatge: number
}

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export default function ProgressBar({ percenatge }: percentageType) {
  return (
    <div className='flex justify-center p-10'>
      <CircularProgressbar
        value={percenatge}
        styles={buildStyles({
          pathColor: percenatge >= 100 ? '#dc2626' : '#f59e0b',
          trailColor: '#e1e1e1',
          textColor: percenatge >= 100 ? '#dc2626' : '#f59e0b',
          textSize: 10,
        })}
        text={`${percenatge}% Gastado`}
      />
    </div>
  )
}
