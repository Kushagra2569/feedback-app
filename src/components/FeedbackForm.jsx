import {useState, useContext, useEffect} from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {

    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(10);
    const {addFeedback, FeedbackEdit, updateFeedback} = useContext(FeedbackContext);
    useEffect(() => {
        if(FeedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(FeedbackEdit.item.text);
            setRating(FeedbackEdit.item.rating);
        }
    }, [FeedbackEdit])

    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if(text !== '' && text.trim().length < 10) {
            setBtnDisabled(true);
            setMessage('Feedback must be at least 10 characters long');
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating, // shorthand for rating: rating
        }
        if(FeedbackEdit.edit === true) {
            newFeedback.id = FeedbackEdit.item.id;
            updateFeedback(newFeedback);
        } else {
            addFeedback(newFeedback);
        }
        setText('');
    }
}

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate our services?</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input type="text" onChange={handleTextChange} value={text} placeholder='Write a review' />
                    <Button type='submit' version='primary' isDisabled={btnDisabled} >Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
