import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Constant from '../Constant';

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)
const renderSelectField = ({ input, meta: { touched, error, warning }, children, label }) => (
    <div>
        <label>{label}</label>
        <div>
            <select {...input}>
                {children}
            </select>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)
const SyncValidationForm1 = (props) => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="name" type="text" component={renderField} label="Name" />
            <Field name="review" type="select" component={renderSelectField} label="Review">
                <option value={Constant.HIT}>{Constant.HIT}</option>
                <option value={Constant.SUPER_HIT}>{Constant.SUPER_HIT}</option>
                <option value={Constant.AVERAGE}>{Constant.AVERAGE}</option>
                <option value={Constant.FLOP}>{Constant.FLOP}</option>
            </Field>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'syncValidation1',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form
})(SyncValidationForm1)