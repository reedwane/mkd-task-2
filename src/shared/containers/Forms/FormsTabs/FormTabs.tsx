import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { FormsTabs } from 'Components/Tabs';

import { ContractFormsTab } from 'Containers/Forms/FormsTabs';

const FormsTabsContainer = () => (
  <FormsTabs id="forms-tabs">
    <ContractFormsTab />
  </FormsTabs>
);

FormsTabsContainer.defaultProps = {};

const FormsTabsContainerMemo = memo(FormsTabsContainer, areEqual);

export { FormsTabsContainerMemo as FormsTabs };
