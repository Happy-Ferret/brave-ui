# Coverage, running and creating tests

Testing is a critical step for any reliable library, which is what we're trying to accomplish. We make use of structural and snapshot tests, with coverage support for human readable testing information.


## Running tests 

You can run a test matching a name by running:

```
npm run test "describe text here"

# supposing you want to run tests for `browserButton`
npm run test "browserButton"
```

To run all tests

```
npm run test-all
```

### Running coverage

To run test coverage

```
npm run coverage
```

Coverage outputs a nice HTML version in case you want a human-readable version of what is covered by tests. This is generated at test-time and skipped from git push hook.

Supposing you're running macOS, the source is available under `file:///Users/<your_user_name>/<path_to_this_repo>/brave-ui/coverage/lcov-report/index.html`

### Creating tests

We make use of Jest combined with Enzyme for our tests. For a list of supported `matchers` for testing please refer to [Jest:using matchers](https://facebook.github.io/jest/docs/en/using-matchers.html).

While writing tests, take note that given the async nature of Aphrodite, you'll need to resume the style injection after each test. An example is demonstrated below:

```js
import {resumeStyleInjection} from './lib/utils'

describe('your brand new tests', () => {
  afterEach(() => {
    // This is required
    resumeStyleInjection()
  })

  it('does something', () => {
    // your code here
  })
```

An example of how to write a structural test with Enzyme:

```jsx
import YourAwesomeComponent from '../brave-ui/YourAwesomeComponent'

it('renders the component', () => {
  const wrapper = mount(<YourAwesomeComponent />)
  const assertion = wrapper.find('#yourAwesomeComponent').length
  expect(assertion).toBe(1)
})
```

We also make use of Snapshot testing. This guarantees that our UI does not change unexpectedly.

A snapshot test will fail if either the change is unexpected, or the screenshot needs to be updated to the new version of the UI component.

For convention, please write your snapshot test as the first test in your `describe` method. An example of snapshot testing is below:

```jsx
import YourAwesomeComponent from '../brave-ui/YourAwesomeComponent'

describe('yourAwesomeComponent tests', () => {
  afterEach(() => {
    resumeStyleInjection()
  })

  it('matches the snapshot', () => {
    const component = <YourAwesomeComponent someAweProp='cool' />
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

If you just created your component, when you run the test for the first time Jest will create the snapshot for you, hosted under `tests/__snapshots__/componentName.test.js.snap`. You should edit that file if you made intentional changes to your component leading to a failing test.

Note that this file should be committed too as any other changes.
