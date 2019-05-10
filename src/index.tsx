import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';

interface PopupState {
  toggle: () => void;
  expand: () => void;
  dismiss: () => void;
  control: {
    id: string;
    'aria-haspopup': string;
    'aria-expanded': string;
  };
  target: {
    expanded: boolean;
    dismiss: () => void;
    'aria-labelledby': string;
  };
}

const TRUE = 'true';
const FALSE = 'false';
const ESCAPE = 27;

let index = 0;
const generateId = () => `__popup__${index++}`;

export function usePopup(initial_expanded = false): PopupState {
  const [expanded, setExpanded] = useState(initial_expanded);
  const toggle = useCallback(() => setExpanded(expanded => !expanded), [setExpanded]);
  const expand = useCallback(() => setExpanded(true), [setExpanded]);
  const dismiss = useCallback(() => setExpanded(false), [setExpanded]);
  const id = useMemo(() => generateId(), []);

  return {
    toggle,
    expand,
    dismiss,
    control: {
      id,
      'aria-haspopup': TRUE,
      'aria-expanded': expanded ? TRUE : FALSE
    },
    target: {
      expanded,
      dismiss,
      'aria-labelledby': id
    }
  };
}

export interface PopupProps {
  [key: string]: any;
}

export function Popup(props: PopupProps) {
  const { expanded, dismiss, ...attributes } = props;
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!el.current || el.current.contains(((e as unknown) as MouseEvent).target as Node)) return;

      dismiss();
    };
    const handleKeydown = (e: Event) => {
      if (((e as unknown) as KeyboardEvent).keyCode !== ESCAPE) return;

      dismiss();
    };

    if (expanded) {
      document.addEventListener('mousedown', handleClick, false);
      document.addEventListener('keydown', handleKeydown, false);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick, false);
      document.removeEventListener('keydown', handleKeydown, false);
    };
  }, [expanded]);

  return <div ref={el} aria-hidden={expanded ? FALSE : TRUE} {...attributes} />;
}
