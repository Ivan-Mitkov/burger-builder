import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Hoc';
// import axios from '../../axios-order';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state={
            error:null
        }
        componentWillMount() {
            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                //MUST RETURN REQUEST
                return req;
            })
            this.resInterceptor=axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err})
                
            })
        }
        //this interseptors are needed only in concrete class in concrete situation
        //if interceptors stays it will lead to performance problems by crearing more interceptors
        componentWillUnmount() {
            axios.interceptors.response.eject(this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
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