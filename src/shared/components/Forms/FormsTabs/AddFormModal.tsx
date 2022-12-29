import { Modal } from 'Components/Modal';
import { Form } from 'Containers/Form';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddForm = ({ isOpen, setIsOpen }: Props) => (
  <div>
    <Modal
      modalHeader
      title="Add Contract Form"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      leftHeaderIcon="projects"
      closeButtonText="Cancel"
    >
      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Form" />
      </Form>
    </Modal>
  </div>
);

AddForm.defautProps = {
  isOpen: false,
  setIsOpen: undefined,
};

const AddFormMemo = memo(AddForm, areEqual);

export { AddFormMemo as AddForm };
