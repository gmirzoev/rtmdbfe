import { InjectedFormProps } from 'redux-form/lib/reduxForm'
import { WrappedFieldProps } from 'redux-form/lib/Field'

export interface IFormData {
  search: string;
}

export type ISearchInputFieldProps = WrappedFieldProps & {
  type: string;
}

export type ISearchFormProps = InjectedFormProps<IFormData>
