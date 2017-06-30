import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import {DateTime} from 'vega-lite/build/src/datetime';
import {OneOfFilter} from 'vega-lite/build/src/filter';

import {FILTER_MODIFY_ONE_OF, FilterAction} from '../../actions/filter';

import * as styles from './filter-shelf.scss';


export interface OneOfFilterShelfProps {
  filter: OneOfFilter;
  handleAction: (action: FilterAction) => void;
}

class OneOfFilterShelfBase extends React.Component<OneOfFilterShelfProps, {}> {
  public render() {
    const {filter} = this.props;
    const oneOfFilter = (filter.oneOf as any[]).map(option => {
      return (
        <label key={option}>
          <input type='checkbox' value={option}/>{option}
        </label>
      );
    });
    return (
      <div>
        {oneOfFilter}
      </div>
    );
  }

  protected FilterModifyOneOf(index: number, oneOf: string[] | number[] | boolean[] | DateTime[]) {
    const {handleAction} = this.props;
    handleAction({
      type: FILTER_MODIFY_ONE_OF,
      payload: {
        index: index,
        oneOf: oneOf
      }
    });
  }
}

export const OneOfFilterShelf = CSSModules(OneOfFilterShelfBase, styles);
