import * as React from 'react';
import {Bind, Debounce} from 'lodash-decorators';
import SearchBar from 'Components/SearchBar';
import ImagePreview from 'Components/ImagePreview';

import * as styles from './StockPhotoSearch.scss';

interface Props {}

interface Image {
  id: string;
  url: string;
}

export default class StockPhotoSearch extends React.Component<Props, {
  searching: boolean;
  images: Image[];
}> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searching: false,
      images: [],
    };
  }

  @Debounce(300)
  doSearch(query: string) {
    this.setState({searching: true, images: []});
    fetch(`https://api.unsplash.com/search/photos?query=${encodeURI(query)}&client_id=4e0551efb2e3bc6fadad1b98a0f39efa8b462f031ce5460e63e9c3571bca347f&per_page=10`)
      .then((res) => res.json())
      .then(({results}) => {
        const images = results.map(({id, urls: {thumb}}: any) => ({id, url: thumb}));
        this.setState({images, searching: false});
      });
  }

  @Bind()
  onInputChange({target}: React.ChangeEvent<HTMLInputElement>) {
    const query = (target as HTMLInputElement).value;
    this.doSearch(query);
  }

  render() {
    const {images, searching} = this.state;

    return (
      <section className={styles.StockPhotoSearch}>
        <SearchBar onChange={this.onInputChange} />
        <div>
          {searching && 'Searching...'}
          {images.length < 1 && !searching && 'No results.'}
          {images.map(({id, url}) => <ImagePreview key={id} src={url} />)}
        </div>
      </section>
    );
  }
}
