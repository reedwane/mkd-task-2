import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { FormsTabs } from './FormsTabs';

const FormsContainer = () => <FormsTabs />;

const FormsContainerMemo = memo(FormsContainer, areEqual);

export { FormsContainerMemo as FormsContainer };
