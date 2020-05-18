import React, { ReactNode } from 'react';
import classnames from 'classnames';

export const Table = (props: { children: ReactNode; className?: string }): JSX.Element => (
  <div role={'table'} className={classnames(props.className)}>
    {props.children}
  </div>
);

export const Cell = (props: { children: ReactNode; className?: string }): JSX.Element => (
  <div role={'cell'} className={props.className}>
    {props.children}
  </div>
);

export const Row = (props: { children: ReactNode; className?: string }): JSX.Element => (
  <div className={classnames('row', props.className)} role={'row'}>
    {props.children}
  </div>
);

export const RowGroup = (props: { children: ReactNode; className?: string }): JSX.Element => (
  <div className={props.className} role={'rowgroup'}>
    {props.children}
  </div>
);

export const ColumnHeader = (props: { children: ReactNode; className?: string }): JSX.Element => (
  <div className={classnames(props.className)} role={'columnheader'}>
    {props.children}
  </div>
);
