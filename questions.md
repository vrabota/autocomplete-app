# Interview Questions

#### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

It's the same thing, `PureComponent` it's used for performance optimizations, it's implements lifecycle `shouldComponentUpdate` for you and shallow comparison to check if component should re-render.
You can use regular `Component` with `shouldComponentUpdate` lifecycle manually, but you need to be careful because if you miss some props or state, component can block required re-renders.
So it's better to avoid this type of performance improvements at all, React it's fast enough to do all this rendering stuff, implement all this performance tricks only after measure performance leaks.

```javascript
class Parent extends React.Component {
  render() {
    return (
      <Child
        caption="ImageGallery"
        texts={['text1', 'text2']}
      />
    );
  }
}

class Child extends React.PureComponent {
  render() {
    return (
      <div>
        <span>{this.props.caption}</span><br />
        {this.props.texts.map((text) => (
          <span>{text}</span>
        ))}
      </div>
    );
  }
}
```

This is an example where instead of optimizing our `Child` component we will do less efficient code.
`PureComponent` will do only shallow comparison, in our case `texts` prop is an array and for each re-render it's will create a new array even if contains the same value.

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

I think SCU can block context propagation. So basically we can `shouldComponentUpdate` to fix some performance issues and block rendering except some specific props needed for this component. When we will have some changes in our context, then our component will not be able to re-render.

#### 3. Describe 3 ways to pass information from a component to its PARENT.

1. Create a callback function that change something in parent state and pass this function to child to be called.
2. React Context
3. Other state management solutions like Redux, Mobx, Jotai, Zustand and others.

#### 4. Give 2 ways to prevent components from re-rendering.

1. `shouldComponentUpdate` or `PureComponent` for class components
2. `React.memo()` for functional components
3. `useCallback()` or `useMemo()` hooks for handling not shallow comparison.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments can group multiple children elements without adding any node to DOM. A good example can be a table

```javascript
<table>
    <tr>
        <SomeComponent />
    </tr>
</table>

function SomeComponent() {
    return (
        <>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
        </>
    )
}
```
So if we remove `<></>` fragments in above example we will receive an error, because multiple node elements should be wrapped in a parent node.

#### 6. Give 3 examples of the HOC pattern.

The most used cases for HOC pattern is some conditional rendering of JSX or passing some props or state to components.
With this pattern we can optimize and remove code duplications and enhance readability of the project.

1. `connect()` function from react-redux library where we pass mapStateToProps or mapDispatchToProps
2. ANY custom HOC or library like auth0 or amplify, for example to manage permissions or auth state
3. ANY custom HOC for Google Analytics to push some events to dataLayer

Example of HOC creation:

```javascript
const withHigherOrderComponent = (Component) => (props) => <Component {...props} />;
```

#### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

1. `async..await` we can handle errors with `try {} catch {}` construction.
2. `promises` we can handle in 2 ways: `promise().then().catch()` or if we create the promise from scratch we can use `new Promise(resolve, reject) { reject(new Error()) }`
3. `callbacks` we can pass some functions as callbacks to handle success or error states

#### 8. How many arguments does setState take and why is it async.

`setState()` can accept 2 params:
1. updater we can pass `setState({ count: 1 })` or even a function to access previous state or props `setState((prevState, props) => {})`
2. a function callback where we can have access to updated state

`setState()` it's async because of performance concerns, setting state in sync mode can block rendering and this is something we want to avoid to offer users a better experience.

#### 9. List the steps needed to migrate a Class to Function Component.

1. use function instead of class
2. remove the constructor
3. remove the render() method, keep the return
4. add const before all methods
5. remove this.state throughout the component
6. remove all references to ‘this’ throughout the component
7. Set initial state with useState()
8. change this.setState(), call the function that you named in the previous step to update the state…
9. replace componentDidMount with useEffect
10. replace componentDidUpdate with useEffect
11. replace componentWillUnmount with useEffect

#### 10. List a few ways styles can be used with components.
1. inline with style attribute `style={{ color: 'red' }}`
2. using classNames or utility css framework like Tailwind
3. using CSS Modules to encapsulate component specific styles
4. CSS in JS using libraries like styled components or emotion

#### 11. How to render an HTML string coming from the server.

with `dangerouslySetInnerHTML` prop, we need also to pass an object with `__html` key

```javascript
<Text dangerouslySetInnerHTML={{ __html: '<h1>Hello world!</h1>' }} />
```



