import { ComponentMeta, ComponentStory } from '@storybook/react'

import MenuButton from './MenuButton'

export default {
  title: 'Example/MenuButton',
  component: MenuButton,
  argTypes: { onSelect: { action: 'clicked' } },
} as ComponentMeta<typeof MenuButton>

const Template: ComponentStory<typeof MenuButton> = (args) => (
  <MenuButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  options: ['Option A', 'Option B', 'Option C'],
  selected: 'Option A',
}

export const WithCustomRender = Template.bind({})
WithCustomRender.args = {
  options: ['Option A', 'Option B', 'Option C'],
  selected: (
    <div style={{ display: 'flex' }}>
      <img
        src="/top5-logo-50px.png"
        alt="image"
        style={{ width: '20px', marginRight: '1em' }}
        role="presentation"
      />
      Option A
    </div>
  ),
}
