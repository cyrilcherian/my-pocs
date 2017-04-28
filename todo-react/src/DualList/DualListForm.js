import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Constant from '../Constant';
import { withRouter } from 'react-router';
import user from '../Action/User';
import dualStore from '../Store/DualStore';

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
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({data: dualStore.getState()});
        dualStore.subscribe(() => {
            console.log("yaaa called", dualStore.getState());
            this.setState({data: dualStore.getState()});
            //this.forceUpdate();
        });
        user.dualData();
    }
    selectChange(v){
        this.props.change("name", v.target.value);
        this.setState({text: v.target.value});
        console.log("helllllo", v.target.value, this.props.match.params, this.state)
    }
    selectTextChange(v){
        console.log("helllllo", v.target.value, this.props.match.params, this.state)
    }
    
    render() {
        const { handleSubmit, submitting, match } = this.props;
        
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Field onChange={this.selectTextChange.bind(this)} name="name" type="text" component={renderField} label="Name" />
                    <Field onChange={this.selectChange.bind(this)} name="review" type="select" component={renderSelectField} label="Review">
                        {this.state.data.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </Field>
                    <div>
                        <button type="submit" disabled={submitting}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'syncValidation2',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form,
})(withRouter(SyncValidationForm))