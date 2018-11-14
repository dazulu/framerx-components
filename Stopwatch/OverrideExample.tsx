/*
  Overrides for using your own custom start/pause/reset controls with Stopwatch
*/

import { Data, Override } from 'framer';

const data = Data({ timerStatus: '' });

export const TimerStatus: Override = () => {
  return {
    timerStatus: data.timerStatus
  };
};

export const StartTimer: Override = () => {
  return {
    onTap() {
      data.timerStatus = 'start';
    }
  };
};

export const PauseTimer: Override = () => {
  return {
    onTap() {
      data.timerStatus = 'pause';
    }
  };
};

export const ResetTimer: Override = () => {
  return {
    onTap() {
      data.timerStatus = 'reset';
    }
  };
};
