import React, { memo } from 'react';

import { Spinner } from 'Components/Spinner';
import { PurpleButton } from 'Components/Button/PurpleButton';

import { areEqual } from 'Utils/equalityChecks';

import { Table, TableBody, TableColumn, TableHeader, TableRow } from 'Components/Table';
import { Icon } from 'Components/Icons';
import { formatDate } from 'Utils/helpers';
import { Modal } from 'Components/Modal';
import { Api } from 'Utils/api';
import classes from './contractforms.tab.module.css';

interface Props {
  forms?: any;
  //   totalEmployees: number;
  fetching?: boolean;
  //   selectCardClick: (employee: any) => void;
  //   onButtonClick: (e: any) => void;
}

const ContractFormsTab = ({ forms, fetching }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [formInProcess, setFormInProcess] = React.useState<any>();

  const handleDelete = (form: any) => {
    setOpenModal(true);
    setFormInProcess(form);
  };

  const handleConfirmDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const contractId = formInProcess?.id;
    try {
      await Api.delete(`/contract-forms/${contractId}`);
      setFormInProcess(null);
      setOpenModal(false);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error?.message);
    }
  };

  const handleCloseModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenModal(false);
  };

  return (
    <div className={classes.employeesContent}>
      <div className={`d-flex justify-content-start align-items-center ${classes.contentHeader}`}>
        <h2>Form Templates</h2>
        <PurpleButton className={classes.inviteButton} onClick={() => {}}>
          Add +
        </PurpleButton>
      </div>
      {fetching ? <Spinner loading /> : null}
      {!fetching && forms ? (
        <Table>
          <TableHeader>
            {['TEMPLATE NAME', 'DATE CREATED', ''].map((head: any) => (
              <TableColumn key={`${head} head`}>{head}</TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {forms?.map((form: any) => (
              <TableRow key={form.name}>
                <TableColumn>{form.name}</TableColumn>
                <TableColumn>{formatDate(form.created_at, 'mmm d, yyy')}</TableColumn>
                <TableColumn onClick={() => handleDelete(form)}>
                  <Icon type="trash" />
                </TableColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}

      <Modal
        modalHeader
        title="Delete Contract Form"
        isOpen={openModal}
        setIsOpen={() => setOpenModal(false)}
        leftHeaderIcon="project"
        closeButtonText="Cancel"
      >
        <p>Are you sure you want to delete this Form?</p>

        <div className={`${classes.modalButtons}`}>
          <button className="btn btn-danger outline" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button className="btn btn-primary outline" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

ContractFormsTab.defaultProps = {
  forms: undefined,
  fetching: true,
};

const ContractFormsTabMemo = memo(ContractFormsTab, areEqual);

export { ContractFormsTabMemo as ContractFormsTab };
