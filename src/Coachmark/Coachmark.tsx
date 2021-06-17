import React from 'react';
import Joyride, { Step } from 'react-joyride';

type CoachmarkProps = {
  steps: Step[];
  [key: string]: unknown;
};

const Coachmark = ({ steps, ...rest }: CoachmarkProps) => {
  return <Joyride steps={steps} {...rest} />;
};

export default Coachmark;
