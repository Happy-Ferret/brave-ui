/* global jest, expect, describe, it, afterEach */
import * as React from 'react'
import { shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import { resumeStyleInjection } from './lib/utils'
import Anchor from '../brave-ui/src/anchor'
import theme from '../brave-ui/src/theme'

describe('anchor tests', () => {
  afterEach(() => {
    // Note: this is required for every test file
    // see utils.resumeStyleInjection for more info
    resumeStyleInjection()
  })

  // href: string
  // noStyle?: boolean
  // target?: '_blank' | '_parent' | '_self' | '_top'
  // text: string | number

  // 'defines a href'
  // 'defines a target'
  // 'rel defaults to noreferrer noopener'
  // 'defines a text'

  it('matches the snapshot', () => {
    const component = <Anchor href='#' text='testText' />
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the component', () => {
    const wrapper = shallow(<Anchor id='anchor' href='#' text='testText' />)
    const assertion = wrapper.find('#anchor').length
    expect(assertion).toBe(1)
  })

  it('defines a href', () => {
    const wrapper = shallow(<Anchor href='https://nespresso.com' text='testText' />)
    const assertion = wrapper.find('a').props().href
    expect(assertion).toEqual('https://nespresso.com')
  })

  it('defines a target', () => {
    const wrapper = shallow(<Anchor href='#' text='testText' target='_blank' />)
    const assertion = wrapper.find('a').props().target
    expect(assertion).toEqual('_blank')
  })

  it('rel defaults to noreferrer noopener', () => {
    const wrapper = shallow(<Anchor href='#' text='testText' />)
    const assertion = wrapper.find('a').props().rel
    expect(assertion).toEqual('noreferrer noopener')
  })

  it('can pass text', () => {
    const wrapper = shallow(<Anchor href='#' text='GOTCHA' />)
    const assertion = wrapper.find('a').text()
    expect(assertion).toBe('GOTCHA')
  })
})
