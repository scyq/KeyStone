import React from 'react';


class Content extends React.Component {

    render() {
        if (this.props.renderQueue !== []) {
            return (
                <div background-color={this.props.background}>
                    {this.props.renderQueue}
                </div>
            );
        }
        return (
            <div>

            </div>
        );
    }
}


export default Content;