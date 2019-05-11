import { InjectedFormProps } from 'redux-form/lib/reduxForm'
import { WrappedFieldProps } from 'redux-form/lib/Field'

export interface IFormValues {
  login: string
}

export type IAuthInputFieldProps = WrappedFieldProps & {
  type: string;
  placeholder: string;
}

export type IAuthFormProps = InjectedFormProps<IFormValues>
