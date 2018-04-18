import * as React from 'react';

import * as styles from './SearchBar.scss';

interface Props {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default ({onChange}: Props) => (
  <input
    onChange={onChange}
    className={styles.Input}
    type="search"
    placeholder="Search for something cool..."
  />
);
