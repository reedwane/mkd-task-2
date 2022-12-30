import { TabContent } from 'Components/Tabs';
import * as React from 'react';

import { ContractFormsTab as ContractForm } from 'Components/Forms';
import { Api } from 'Utils/api';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';

interface IContractFormsProps {}

const ContractFormsTab: React.FunctionComponent<IContractFormsProps> = () => {
  const [fetching, setFetching] = React.useState(true);
  const [data, setData] = React.useState([]);

  const user: UserModel = useUser();
  const companyId = user.companies[0].id;

  const fetchForms = async () => {
    setFetching(true);
    try {
      const response = await Api.get(`/companies/${companyId}/contract-forms`);
      const data = response.data;
      setData(data.data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  React.useEffect(() => {
    fetchForms();
  }, []);

  return (
    <TabContent key="tab-content-contract-forms" id="contract-forms" className="show active position-relative">
      <ContractForm fetching={fetching} fetchForms={fetchForms} forms={data} />
    </TabContent>
  );
};

export { ContractFormsTab };
