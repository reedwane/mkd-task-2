import { CheckBox } from 'Components/CheckBox';
import { Icon } from 'Components/Icons';
import { Modal } from 'Components/Modal';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import React, { memo } from 'react';
import { Api } from 'Utils/api';
import { areEqual } from 'Utils/equalityChecks';
import classes from './Addform.modal.module.css';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  fetchForms: () => void;
}

const AddForm = ({ isOpen, setIsOpen, fetchForms }: Props) => {
  const user: UserModel = useUser();
  const companyId = user.companies[0].id;

  const [name, setName] = React.useState('');
  const [requireSignature, setRequireSignature] = React.useState(true);
  const [adding, setAdding] = React.useState(false);
  const [template, setTemplate] = React.useState('');

  const onSubmitForm = async (e: React.FormEvent) => {
    e?.preventDefault();

    try {
      setAdding(true);
      await Api.post('/contract-forms', {
        company_id: companyId,
        name,
        replacement_tags: 'test-tag',
        status: 'active',
        template,
        has_signature: requireSignature,
      });

      setName('');
      setTemplate('');
      setIsOpen(false);

      fetchForms();
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <Modal
        title="Add Contract Form"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        leftHeaderIcon="projects"
        closeButtonText="Cancel"
        classes={classes}
      >
        <div className={`d-flex justify-content-between align-items-center ${classes.header}`}>
          <span className={classes.IconName}>
            <Icon type="projects" />
            <p className={`${classes.title}`}>Add Contract Form</p>
          </span>

          <Icon type="close" onClick={() => setIsOpen(false)} />
        </div>

        <form onSubmit={onSubmitForm} className={`${classes.form}`}>
          <div className={`${classes.formNameGroup}`}>
            <label htmlFor="form-name" className="d-block">
              Form Name
            </label>
            <input
              type="text"
              name="form-name"
              placeholder="Authorization Form"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={`${classes.signatureGroup}`}>
            <label htmlFor="">Require Signature</label>
            <CheckBox
              onChange={() => setRequireSignature(!requireSignature)}
              checked={requireSignature}
              className={`${classes.requireSign}`}
            />
          </div>

          <div className={`${classes.templateGroup}`}>
            <label htmlFor="template" className="d-block">
              Contract Template
            </label>
            <div className="d-flex align-items-start">
              <div className={`${classes.tabs}`}>
                <span>name</span>
                <span>project</span>
                <span>job_no</span>
                <span>company</span>
                <span>current_date</span>
                <span>date_of_loss</span>
                <span>company_address</span>
                <span>policy_holder_name</span>
                <span>policy_number</span>
                <span>claim_number</span>
                <span>input</span>
                <span>checkbox</span>
              </div>
              <textarea
                placeholder="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className={`${classes.template}`}
              />
            </div>
          </div>

          <button
            className={`btn ${classes.submitButton}`}
            onClick={onSubmitForm}
            disabled={adding || (!name && !template)}
          >
            Add Contract
          </button>
        </form>
      </Modal>
    </div>
  );
};

AddForm.defautProps = {
  isOpen: false,
  setIsOpen: undefined,
  fetchForms: undefined,
};

const AddFormMemo = memo(AddForm, areEqual);

export { AddFormMemo as AddForm };
