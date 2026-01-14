import type { Meta, StoryObj } from '@storybook/react-vite'

import { m } from '~/.storybook/i18n/messages'

const Welcome = () => {
  return <div className='bg-gray-100 p-4'>{m.sample_text()}</div>
}

const meta = {
  title: 'Welcome',
  component: Welcome,
  tags: ['autodocs'],
} satisfies Meta<typeof Welcome>

export default meta

type Story = StoryObj<typeof Welcome>

export const Playground: Story = {}
