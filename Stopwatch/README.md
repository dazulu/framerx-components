![Stopwatch Artwork](https://github.com/dazulu/framerx-components/blob/master/Stopwatch/artwork.png)

# Overview

A working **stopwatch** in the format `00:00:00` with multiple options for configuration.

## Features

- Change color of text and buttons
- Change size of text and buttons
- Toggle default button visibility
- Optionally control timer via clicking text
  - Single click to toggle start/pause
  - Double click to reset
- Autostart the timer on load
- Start/Pause/Reset timer with your Overrides

Follow me on Twitter [@dazulu](https://twitter.com/dazulu)

## Override Functionality

It's possible to control the stopwatch using your own custom [Overrides](https://framer.com/learn/docs/overrides). This works great when you have hidden the default buttons in order to create your own custom controls.

The component accepts a prop `timerStatus` with 3 possible values - `start`, `pause` and `reset`.

As as example, here we would apply the `TimerStatus` Override to the component on your stage. You would then apply the `StartTimer`, `PauseTimer` and `ResetTimer` Overrides to each of your custom buttons, as applicable.

```javascript
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
```

## Props

| Prop            | Type    | Description                                                         | Default |
| --------------- | ------- | ------------------------------------------------------------------- | ------- |
| timeColor       | string  | Color of text (css color)                                           | #000    |
| timeSize        | number  | Size of text                                                        | 26      |
| buttonSize      | number  | Size of buttons                                                     | 22      |
| playButtonFill  | string  | Color of play button (css color)                                    | #000    |
| resetButtonFill | string  | Color of reset button (css color)                                   | #000    |
| pauseButtonFill | string  | Color of pause (css color)                                          | #000    |
| showButtons     | boolean | Show/Hide buttons                                                   | false   |
| autoStart       | boolean | Auto start timer on mount                                           | true    |
| timerStatus     | string  | For user with Overrides with values `'start'`, `'pause'`, `'reset'` | null    |

## Changelog

- **1.0.2** - Changed references of `milliseconds` to `hundredths`.
- **1.0.1** - Removed unused package `date-fns`
