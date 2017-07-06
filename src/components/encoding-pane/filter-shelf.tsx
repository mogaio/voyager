import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import {isOneOfFilter, isRangeFilter, OneOfFilter, RangeFilter} from 'vega-lite/build/src/filter';
import {FILTER_REMOVE, FilterAction} from '../../actions/filter';
import * as styles from './filter-shelf.scss';
import {OneOfFilterShelf} from './one-of-filter-shelf';
import {RangeFilterShelf} from './range-filter-shelf';


export interface FilterShelfProps {
  index: number;
  filter: RangeFilter | OneOfFilter;
  handleAction?: (action: FilterAction) => void;
  domain: any[];
}

class FilterShelfBase extends React.Component<FilterShelfProps, {}> {
  public render() {
    const {index, filter} = this.props;
    return (
      <div styleName='filter-shelf'>
        <div styleName='header'>
          <span>{filter.field}</span>
          <a onClick={this.filterRemove.bind(this, index)}>
            <i className='fa fa-times'/>
          </a>
        </div>
        {this.renderFilter()}
      </div>
    );
  }

  protected filterRemove(index: number) {
    const {handleAction} = this.props;
    handleAction({
      type: FILTER_REMOVE,
      payload: {
        index: index
      }
    });
  }

  private renderFilter() {
    const {domain, filter, index, handleAction} = this.props;
    if (isRangeFilter(filter)) {
      return <RangeFilterShelf domain={domain} index={index} filter={filter} handleAction={handleAction}/>;
    } else if (isOneOfFilter(filter)) {
      return <OneOfFilterShelf domain={domain} index={index} filter={filter} handleAction={handleAction}/>;
    }
  }
}

export const FilterShelf = CSSModules(FilterShelfBase, styles);
