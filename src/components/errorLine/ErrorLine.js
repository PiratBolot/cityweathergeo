import React from 'react';
import {connect} from "react-redux";
import './ErrorLine.css'

class ErrorLine extends React.Component {
    render() {
        return (
            <div>
                {this.props.errorMessage.isError &&
                <div className="error_msg">{this.props.errorMessage.errorMsg}</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errorMessage: {isError: state.errorMessage.isError, errorMsg: state.errorMessage.errorMsg}
});

export default connect(mapStateToProps)(ErrorLine);
