import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback,setFeedback] = useState(FeedbackData);
    const [FeedbackEdit,setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    //delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete this feedback?')){
            setFeedback(feedback.filter(feedback => feedback.id !== id));
        }
    }
    //add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback,...feedback]);
    }
    //Set Feedback to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    }
    //update Feedback item
    const updateFeedback = (updatedFeedback) => {
        setFeedback([updatedFeedback, ...feedback.filter(feedback => feedback.id !== updatedFeedback.id)]);
        setFeedbackEdit({
            item: {},
            edit: false
        });
    }

    return <FeedbackContext.Provider value={{
        feedback,
        FeedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
    {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;