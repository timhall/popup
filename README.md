# @timhall/popup

Simple popup mechanism to display a popup positioned relative to a container (e.g. dropdowns and tooltips) with accessibility in mind.

```jsx
import React, { useState } from 'react';
import { Popup, Container, usePopup } from '@timhall/popup';

export function Dropdown() {
  const popup = usePopup();

  return (
    <Container>
      <button {...popup.control}>Dropdown</button>
      <Popup {...popup.target}>
        {/* ... */}
      </Popup>
    </Container>
  )
}
```
