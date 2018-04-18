import * as React from 'react';
import {render} from 'react-dom';

import './styles/globals/all.scss';
import StockPhotoSearch from './components/StockPhotoSearch';

render(<StockPhotoSearch />, document.getElementById('app'));
