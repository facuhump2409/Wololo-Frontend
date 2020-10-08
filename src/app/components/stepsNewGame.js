import {Form, Formik, FormikConfig, FormikValues} from "formik";
import React, {useState} from "react";
import {Button} from "rsuite";

export function StepGame({children, ...props}: FormikConfig<FormikValues>) {
    return <div>{children}</div>
}

export function StepsNewGame({children, ...props}) {
    const childrenArray = React.Children.toArray(children)
    const [step,setStep] = useState(0)
    const currentChild = childrenArray[step]
    function isLastStep() {
        return step === childrenArray.length - 1
    }
    return (
        <Formik {...props} onSubmit={async (values,helpers) => {
            console.log("Values inside steps", values)
            console.log(props.selectProvince)
            if(isLastStep()) {
                await props.onSubmit(values, helpers)
            }
            else {
                setStep(s => s + 1)
            }
        }}>
            <Form autoComplete="off">
                {currentChild}
                {step > 0 ? <Button onClick={() => setStep(s => s - 1)}> Back </Button> : null }
                <Button type ="submit"> {isLastStep() ? 'Create New Game' : 'Next'} </Button>
            </Form>
        </Formik>
    )
}