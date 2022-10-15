import { ComponentMeta, ComponentStory } from '@storybook/react'

import LoadingIndicator from './LoadingIndicator'

export default {
  title: 'Example/LoadingIndicator',
  component: LoadingIndicator,
} as ComponentMeta<typeof LoadingIndicator>

const Template: ComponentStory<typeof LoadingIndicator> = (args) => (
  <LoadingIndicator {...args} />
)

export const Primary = Template.bind({})
Primary.args = { loading: true, size: 40 }
