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
        this.goEdit = this.goEdit.bind(this);
    }
    componentWillMount() {
        let me = this;
        const initData = {
            "name": "Cyril",
            "review": Constant.FLOP
        };
        new Promise((resolve, reject) => {
            setTimeout(function () {
                me.props.initialize(initData);
            }, 2500);
        });
    }
    goEdit(){
        this.props.history.push('/edit')
    }
    render() {
        const { handleSubmit, submitting } = this.props;
        let me = this;
        return (
            <div>
            <form onSubmit={handleSubmit}>
                <Field name="name" type="text" component={renderField} label="Name" />
                <Field name="review" type="select" component={renderSelectField} label="Review">
                    <option value={Constant.HIT}>{Constant.HIT}</option>
                    <option value={Constant.SUPER_HIT}>{Constant.SUPER_HIT}</option>
                    <option value={Constant.AVERAGE}>{Constant.AVERAGE}</option>
                    <option value={Constant.FLOP}>{Constant.FLOP}</option>
                </Field>
                <Field name="name1" type="text" component={renderField} label="Name1" />
                <div>
                    <button type="submit" disabled={submitting}>Submit</button>
                </div>
            </form>
            <button onClick={me.goEdit}>Go to Edit</button>
            </div>
        );
    }
}


export default reduxForm({
    form: 'syncValidation2',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form,
})(withRouter(SyncValidationForm))