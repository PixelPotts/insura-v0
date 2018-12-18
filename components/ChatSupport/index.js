import ChatSupport from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  setRedDot,
  toggleSupport,
  updateSupportInput,
  toggleSupportModal,
  sendSupportMessage
} from '../../actions/supportActions';


const mapStateToProps = (state) => {

  return {
    redDotPresent: state.supportReducer.redDotPresent,
    supportMessages: state.supportReducer.supportMessages,
    supportInput: state.supportReducer.supportInput,
  };

};


const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    setRedDot,
    toggleSupport,
    updateSupportInput,
    sendSupportMessage,
    toggleSupportModal
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSupport);