import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Chart from 'react-c3-component';
import 'c3/c3.css';
import withRoutes from '../hoc/routes';

export const PieChart = ({ data, width, height, routes, history, action }) => {
    const colors = ['	#FFB6C1', '#009999', '#00CCCC', '#87CEFA', '#33FFFF', '#AFEEEE', '#FA8072', '#90EE90',
        '#D3D3D3', '#E6E6FA', 'e6e6fa', 'e0eee0', 'cdc0b0'];

    return (
        <Chart
            config={{
                size: {
                    height,
                    width,
                },
                data: {
                    columns: data,
                    type: 'pie',
                    onclick: (pieChartCoord) => {
                        action(pieChartCoord.name);
                        history.push(routes.getPathByName('resumes'));
                    }
                },
                pie: {
                    label: {
                        format: value => {
                            return value;
                        }
                    }
                },
                color: {
                    pattern: colors
                },
            }}
        />
    )
}

PieChart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    routes: PropTypes.object.isRequired,
    history: PropTypes.object,
    action: PropTypes.func,
};
export const enhance = compose(
    withRouter,
    withRoutes,
);

export default enhance(PieChart);
