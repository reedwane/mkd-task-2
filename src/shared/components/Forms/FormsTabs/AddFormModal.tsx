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
  const [tag, setTag] = React.useState('');

  const onSubmitForm = async (e: React.FormEvent) => {
    e?.preventDefault();

    if (name && template && tag) {
      try {
        setAdding(true);
        await Api.post('/contract-forms', {
          company_id: companyId,
          name,
          replacement_tags: tag,
          status: 'active',
          template,
          has_signature: requireSignature,
        });

        setName('');
        setTemplate('');
        setTag('');
        setIsOpen(false);

        fetchForms();
      } catch (error: any) {
        // eslint-disable-next-line
        console.log(error.message);
      } finally {
        setAdding(false);
      }
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

        <div className={`${classes.formNameGroup}`}>
          <label htmlFor="form-name">Form Name</label>
          <input type="text" name="form-name" value="Authorization Form" disabled />
        </div>

        <div className={`${classes.signatureGroup}`}>
          <label htmlFor="">Require Signature</label>
          <CheckBox
            onChange={() => setRequireSignature(!requireSignature)}
            checked={requireSignature}
            className={`${classes.requireSign}`}
          />
        </div>

        <form onSubmit={onSubmitForm} className={`${classes.form}`}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="template" value={template} onChange={(e) => setTemplate(e.target.value)} />
          <input type="text" placeholder="replacement tag" value={tag} onChange={(e) => setTag(e.target.value)} />
          <button className={`btn ${classes.submitButton}`} onClick={onSubmitForm} disabled={adding}>
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
