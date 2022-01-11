import Card from "./shared/Card";
import {FaTimes, FaEdit} from "react-icons/fa";
import PropTypes from 'prop-types';
import FeedbackContext from "../context/FeedbackContext";
import {useContext} from 'react';

function FeedbackItem(props) {
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext);
    return (
        <Card >
           <div className="num-display">{props.item.rating}</div> 
           <button className="close" onClick={() => deleteFeedback(props.item.id)}>
                <FaTimes color="purple"/>
           </button>
           <button className="edit" onClick={() => editFeedback(props.item)}>
               <FaEdit color="purple"/>
           </button>
           <div className="text-display">{props.item.text}</div>
        </Card>
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
}


export default FeedbackItem
