import PropTypes from 'prop-types'

function Card(props) {
    return (
        <div className={`card ${props.reverse && 'reverse'}`}>
            {props.children}
        </div>
    )
}

Card.defaultProps = {
    reverse: false,
}

Card.propTypes = {
    reverse: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

export default Card
