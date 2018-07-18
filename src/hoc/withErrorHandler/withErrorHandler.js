import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import AuxNew from "../AuxNew";

const withErrorHandler = (WrapperComponents, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentDidMount() {
     this.reqInterceptors= axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors= axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.reqInterceptors);
        axios.interceptors.response.eject(this.resInterceptors);

    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <AuxNew>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponents {...this.props} />
        </AuxNew>
      );
    }
  };
};

export default withErrorHandler;
