import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Hoc';
// import axios from '../../axios-order';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state={
            error:null
        }
        componentDidMount() {
            axios.interceptors.request.use(req=>{
                this.setState({error:null})
                //MUST RETURN REQUEST
                return req;
            })
            axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err})
                
            })
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return(
                <Aux>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                   Something went wrong
                  <p>{this.state.error?this.state.error.message:null} </p> 
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>

            )
        }

    }
}

export default withErrorHandler;