import { Modal } from 'Components/Modal';
import { Form } from 'Containers/Form';
import React, { memo } from 'react';
import { Api } from 'Utils/api';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddForm = ({ isOpen, setIsOpen }: Props) => {
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      await Api.post('/contract-forms', {
        company_id: 28,
        name: 'Add contract form',
        replacement_tags: 'sample form',
        status: 'active',
        template: 'sample',
        has_signature: true,
      });
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error.message);
    }
  };
  return (
    <div>
      <Modal
        modalHeader
        title="Add Contract Form"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        leftHeaderIcon="projects"
        closeButtonText="Cancel"
      >
        <Form onSubmit={onSubmitForm}>
          <input type="text" placeholder="Form" />
          <button className="btn btn-outline-primary">Add form</button>
        </Form>
      </Modal>
    </div>
  );
};

AddForm.defautProps = {
  isOpen: false,
  setIsOpen: undefined,
};

const AddFormMemo = memo(AddForm, areEqual);

export { AddFormMemo as AddForm };
