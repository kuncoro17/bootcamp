import React from 'react';
import { Form, Field } from 'react-final-form';
import './FormComponent.css'; // Import file CSS untuk styling

const initialValues = {
  firstname: '',
  lastname: '',
  employed: false,
  education: '',
  experience: [],
  preferred: '',
  technology: '',
  notes: ''
};

const onSubmit = (values) => {
  alert('Data berhasil diinput: ' + JSON.stringify(values, null, 2));
};

const FormComponent = () => (
  <div className="form-container">
    <h2>React Final Form Example</h2>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Firstname:</label>
            <Field
              name="firstname"
              component="input"
              type="text"
              placeholder="Firstname"
              className="input-field"
            />
          </div>
          <div className="form-field">
            <label>Lastname:</label>
            <Field
              name="lastname"
              component="input"
              type="text"
              placeholder="Lastname"
              className="input-field"
            />
          </div>
          <div className="form-field">
            <label>
              Employed:
              <Field name="employed" component="input" type="checkbox" />
            </label>
          </div>
          <div className="form-field">
            <label>Education:</label>
            <Field name="education" component="select" className="select-field">
              <option value="">Select...</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">PhD</option>
            </Field>
          </div>
          
            <label>Experience:</label>
            <div className="checkbox-group">
            <label>Experience:</label>
          <div>
            <label>
              <Field
                name="experience"
                component="input"
                type="checkbox"
                value="1"
              />
              Experience 1
            </label>
            <label>
              <Field
                name="experience"
                component="input"
                type="checkbox"
                value="2"
              />
              Experience 2
            </label>
            <label>
              <Field
                name="experience"
                component="input"
                type="checkbox"
                value="3"
              />
              Experience 3
            </label>
            <label>
              <Field
                name="experience"
                component="input"
                type="checkbox"
                value="4"
              />
              Experience 4
            </label>
            <label>
              <Field
                name="experience"
                component="input"
                type="checkbox"
                value="5"
              />
              Experience 5
            </label>
              
              {/* Add other experience checkboxes similarly */}
            </div>
          </div>
          <div className="form-field">
            <label>
              Preferred:
              <Field
                name="preferred"
                component="input"
                type="radio"
                value="option1"
              />
              Option 1
            </label>
          </div>
          <div className="form-field">
            <label>
              Technology:
              <Field
                name="technology"
                component="input"
                type="radio"
                value="tech1"
              />
              Tech 1
            </label>
            <label>
              <Field
                name="technology"
                component="input"
                type="radio"
                value="tech2"
              />
              Tech 2
            </label>
          </div>
          <div className="form-field">
            <label>Notes:</label>
            <Field name="notes" component="textarea" className="textarea-field" />
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={submitting || pristine} className="submit-button">
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
              className="reset-button"
            >
              Reset
            </button>
          </div>
          <div className="form-field">
            <textarea
              rows="10"
              cols="50"
              readOnly
              value={JSON.stringify(values, null, 2)}
              className="json-output"
            />
          </div>
        </form>
      )}
    />
  </div>
);

export default FormComponent;
