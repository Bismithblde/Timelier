import React from 'react';
import { useStopwatch } from '../contexts/StopwatchContext';
import Stopwatch from './Stopwatch';
interface StopwatchProps {
  link: string;
  time: number;
  name: string;
}
export default function StopwatchList() {
  const { stopwatches } = useStopwatch();
  return (
    <div>
      {stopwatches.map(stopwatch => (
        <Stopwatch key={stopwatch.link} stopwatch={stopwatch} />
      ))}
    </div>
  );
}
