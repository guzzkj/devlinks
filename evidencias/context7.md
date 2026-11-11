# Evidência Context7

Consulta real à API do Context7 em 2026-11-10.
Biblioteca: /reactjs/react.dev (documentação oficial do React)
Pergunta: useState com valor inicial vindo do localStorage (lazy initial state)

```
### Passing an initializer function to useState

Source: https://github.com/reactjs/react.dev/blob/main/src/content/reference/react/useState.md

Passes the function reference directly to useState so React only executes it during the initial component render.

```javascript
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

--------------------------------

### Avoiding recreating the initial state

Source: https://github.com/reactjs/react.dev/blob/main/src/content/reference/react/useState.md

React saves the initial state once and ignores it on the next renders.

Although the result of `createInitialTodos()` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating large arrays or performing expensive calculations.

To solve this, you may **pass it as an _initializer_ function** to `useState` instead:

Notice that you’re passing `createInitialTodos`, which is the *function itself*, and not `createInitialTodos()`, which is the result of calling it. If you pass a function to `useState`, React will only call it during initialization.

React may [call your initializers twice](#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure.](/learn/keeping-components-pure)

--------------------------------

### Generate stable IDs using state initializer function

Source: https://github.com/reactjs/react.dev/blob/main/src/content/reference/eslint-plugin-react-hooks/lints/purity.md

Demonstrates passing an impure function like crypto.randomUUID() inside a useState initializer function so it executes only once during component initialization.

```javascript
// ✅ Stable IDs from initial state
function Component() {
  const [id] = useState(() => crypto.randomUUID());
  return <div key={id}>Content</div>;
}
```

--------------------------------

### Avoiding recreating the initial state > Passing the initializer function

Source: https://github.com/reactjs/react.dev/blob/main/src/content/reference/react/useReducer.md

This example passes the initializer function, so the `createInitialState` function only runs during initialization. It does not run when component re-renders, such as when you type into the input.

--------------------------------

### Local Persistence with useState Lazy Initializer

Source: https://github.com/reactjs/react.dev/blob/main/src/content/reference/react-dom/browser.md

Official React 19 recommendation for localStorage-backed state: mark the component as browser-only via use(browser(...)), lazily initialize state from localStorage with a useState initializer function, and persist on every change.

```jsx
import { Suspense, use, useState } from 'react';
import { browser } from 'react-dom';

function SavedDraft() {
  use(browser('The draft is stored in localStorage.'));
  const [draft, setDraft] = useState(
    () => localStorage.getItem('draft') ?? ''
  );

  function handleChange(event) {
    const nextDraft = event.target.value;
    setDraft(nextDraft);
    localStorage.setItem('draft', nextDraft);
  }

  return (
    <label>
      Draft:
      <textarea
        value={draft}
        onChange={handleChange}
        rows={4}
        cols={30}
      />
    </label>
  );
}
```
```
