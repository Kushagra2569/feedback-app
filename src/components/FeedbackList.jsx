import FeedbackItem from './FeedbackItem';
import { useContext } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList(props) {

    const {feedback} = useContext(FeedbackContext);

    if(!feedback||!feedback.length) {
        return (<p>No Feedback to display</p>)
    }
    return (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div 
                        key={item.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <FeedbackItem key={item.id} item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}


export default FeedbackList
