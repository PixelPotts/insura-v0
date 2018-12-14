import NewChatModal from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { 
  toggleNewChatModal,
} from '../../actions/supportActions';


const mapStateToProps = (state) => {

  return {
  };

};


const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    toggleNewChatModal
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(NewChatModal);
