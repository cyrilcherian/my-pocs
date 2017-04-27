import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Constant from '../Constant';
import { withRouter } from 'react-router';

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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
}
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
class SyncValidationForm extends Component {
    constructor(){
        super();
    }
    componentWillMount() {
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        let me = this;
        return (
            <div>
            <form onSubmit={handleSubmit}>
                <Field name="name" type="text" component={renderField} label="Username" />
                <Field name="password" type="password" component={renderField} label="Password" />
                <div>
                    <button type="submit" disabled={submitting}>Submit</button>
                </div>
            </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'syncValidation3',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form,
})(withRouter(SyncValidationForm))