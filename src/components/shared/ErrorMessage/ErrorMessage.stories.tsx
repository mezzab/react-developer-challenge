import { ToastContainer } from 'react-toastify'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import ErrorMessage from './ErrorMessage'

import 'react-toastify/dist/ReactToastify.css'

export default {
  title: 'Example/ErrorMessage',
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>

const Template: ComponentStory<typeof ErrorMessage> = (args) => (
  <>
    <ToastContainer />
    <ErrorMessage {...args} />
  </>
)

export const Primary = Template.bind({})
Primary.args = { error: { statusCode: 500, message: 'Server Error' } }
