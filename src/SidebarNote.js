/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, useRef, useEffect} from 'react';

import {NavLink, useTransition, useSearchParams} from 'remix';
import {matchPath} from 'react-router-dom';

export default function SidebarNote({id, title, children, expandedChildren}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const {location: nextLocation} = useTransition();
  const isPending =
    nextLocation &&
    matchPath('/:noteId', nextLocation.pathname)?.params.noteId === String(id);
  let href = `/${id}`;
  if (searchParams.has('term')) {
    href += `?term=${searchParams.get('term')}`;
  }

  // Animate after title is edited.
  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);
  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add('flash');
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current.classList.remove('flash');
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}>
      {children}
      <NavLink
        prefetch="intent"
        className="sidebar-note-open"
        style={({isActive}) => ({
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
            ? 'var(--tertiary-blue)'
            : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        })}
        to={href}>
        Open note for preview
      </NavLink>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
