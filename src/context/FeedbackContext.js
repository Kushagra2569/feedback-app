import { createContext, useState, useEffect} from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback,setFeedback] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [FeedbackEdit,setFeedbackEdit] = useState({
        item: {},
        edit: false
    });
    useEffect(() => {
        getFeedback();
    },[]);

    //Fetch all feedback
    const getFeedback = async () => {
        const response = await fetch('/feedback?_sort=id_order=desc');
        const data  = await response.json();
        setFeedback(data);
        setIsLoading(false);
    }
    //delete feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this feedback?')){
            await fetch(`/feedback/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setFeedback(feedback.filter(feedback => feedback.id !== id));
        }
    }
    //add Feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });
        const data = await response.json();
        setFeedback([data,...feedback]);
    }
    //Set Feedback to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    }
    //update Feedback item
    const updateFeedback = async (updatedFeedback) => {
        const response = await fetch(`/feedback/${updatedFeedback.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFeedback)
        });
        const data = await response.json();
        setFeedback([data, ...feedback.filter(feedback => feedback.id !== data.id)]);
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
        updateFeedback,
        isLoading
    }}>
    {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;