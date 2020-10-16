import React from 'react';


class Content extends React.Component {

    render() {
        if (this.props.renderQueue !== []) {
            return (
                <div>
                    {this.props.renderQueue[0]}
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