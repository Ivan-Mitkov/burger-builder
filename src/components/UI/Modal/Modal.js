import React ,{Component} from 'react';
import ModalCss from './Modal.module.css';
import Aux from '../../../hoc/Hoc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    //!!!!So the order wich is child of Modal will not update if it's not visible
    shouldComponentUpdate(nextProps,nextState){
            return nextProps.show!==this.props.show||nextProps.children!==this.props.children;            
    }

    //this is just for check
    componentWillUpdate(){
        // console.log('Modal updates');
    }
    render(){
        return (
            <Aux>
                <Backdrop
                 show={this.props.show}
                 clicked={this.props.modalClosed}>            
    
                </Backdrop>
                <div className={ModalCss.Modal}
                    style={
                        {
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }
                    }>
                    {this.props.children}
                </div>
            </Aux>
    
        )
    }
  
}

export default Modal